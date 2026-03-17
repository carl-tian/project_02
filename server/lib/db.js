import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "data", "db.json");

let writeLock = Promise.resolve();

async function readDb() {
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    const data = JSON.parse(raw);
    return typeof data === "object" && data ? data : { items: {} };
  } catch {
    return { items: {} };
  }
}

async function writeDb(data) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}

async function withWrite(fn) {
  writeLock = writeLock.then(fn, fn);
  return writeLock;
}

export async function getStats() {
  const db = await readDb();
  return db.items ?? {};
}

function ensureItem(db, id) {
  db.items ??= {};
  db.items[id] ??= { likes: 120, shares: 32, liked: false, comments: [] };
  db.items[id].comments ??= [];
  return db.items[id];
}

export async function toggleLike(id) {
  return withWrite(async () => {
    const db = await readDb();
    const item = ensureItem(db, id);
    item.liked = !item.liked;
    item.likes = Math.max(0, Number(item.likes ?? 0) + (item.liked ? 1 : -1));
    await writeDb(db);
    return { id, liked: item.liked, likes: item.likes };
  });
}

export async function getComments(id) {
  const db = await readDb();
  const item = ensureItem(db, id);
  return item.comments;
}

export async function addComment(id, text) {
  const clean = String(text).trim().slice(0, 200);
  if (!clean) return null;
  return withWrite(async () => {
    const db = await readDb();
    const item = ensureItem(db, id);
    const comment = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: clean,
      at: Date.now()
    };
    item.comments.unshift(comment);
    await writeDb(db);
    return comment;
  });
}

