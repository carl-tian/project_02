import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listVideos } from "./lib/videos.js";
import { getStats, toggleLike, addComment, getComments } from "./lib/db.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosDir = path.join(__dirname, "videos");
app.use("/media", express.static(videosDir, { fallthrough: true }));

app.get("/api/feed", async (_req, res) => {
  const videos = await listVideos(videosDir);
  const stats = await getStats();
  const items = videos.map((v) => {
    const s = stats[v.id] ?? {};
    return {
      id: v.id,
      url: v.url,
      author: s.author ?? v.author,
      description: s.description ?? v.description,
      music: s.music ?? v.music,
      liked: Boolean(s.liked),
      likes: Number.isFinite(s.likes) ? s.likes : 120,
      comments: Array.isArray(s.comments) ? s.comments.length : 8,
      shares: Number.isFinite(s.shares) ? s.shares : 32
    };
  });
  res.json({ items });
});

app.post("/api/like", async (req, res) => {
  const id = req.body?.id;
  if (!id) return res.status(400).json({ error: "Missing id" });
  const updated = await toggleLike(String(id));
  res.json(updated);
});

app.get("/api/comments/:id", async (req, res) => {
  const id = String(req.params.id);
  const comments = await getComments(id);
  res.json({ id, comments });
});

app.post("/api/comment", async (req, res) => {
  const id = req.body?.id;
  const text = req.body?.text;
  if (!id || !text) return res.status(400).json({ error: "Missing id/text" });
  const comment = await addComment(String(id), String(text));
  res.json({ ok: true, comment });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`[server] serving media from ${videosDir}`);
});

