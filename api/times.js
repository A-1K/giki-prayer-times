// Serverless proxy: fetches the mosque's official jamaat board server-side
// (the source API blocks cross-origin browser requests) and re-serves it
// to the PWA with CORS headers so times auto-sync when the admin updates them.
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300"); // 5-min edge cache
  try {
    const r = await fetch("https://salahtimes-giki.vercel.app/api/config", {
      headers: { "accept": "application/json" },
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const data = await r.json();
    res.status(200).json({ ok: true, source: "mosque", ...data });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e) });
  }
}
