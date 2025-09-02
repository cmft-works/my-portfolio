// api/newsletters.js
// Load .env.local in dev (Vercel sets envs in prod automatically)
if (!process.env.VERCEL) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { config } = await import('dotenv');
  config({ path: '.env.local' });
}

import { parseStringPromise } from "xml2js";

export default async function handler(req, res) {
  try {
    const feedUrl = process.env.NEWSLETTER_RSS; // e.g. https://chanakyamudavath.substack.com/feed
    if (!feedUrl) return res.status(500).json({ error: "NEWSLETTER_RSS not set" });

    const resp = await fetch(feedUrl);
    if (!resp.ok) return res.status(502).json({ error: "Failed to fetch RSS" });

    const xml = await resp.text();
    const data = await parseStringPromise(xml, { explicitArray: false });

    let items = [];
    if (data?.rss?.channel?.item) {
      const arr = Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item];
      items = arr.map((it) => ({
        title: it.title,
        link: it.link,
        description: it.description || "",
        date: it.pubDate || it["dc:date"] || ""
      }));
    } else if (data?.feed?.entry) {
      const arr = Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];
      items = arr.map((it) => ({
        title: it.title?._ || it.title,
        link: it.link?.href || (Array.isArray(it.link) ? it.link[0]?.href : ""),
        description: it.summary?._ || it.summary || it.content?._ || it.content || "",
        date: it.updated || it.published || ""
      }));
    }

    items = items.slice(0, 20);
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json({ items });
  } catch (e) {
    return res.status(500).json({ error: "parse error", details: String(e) });
  }
}
