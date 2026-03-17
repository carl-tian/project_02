import fs from "node:fs/promises";
import path from "node:path";

const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

function safeIdFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "video";
}

export async function listVideos(videosDir) {
  let entries = [];
  try {
    entries = await fs.readdir(videosDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => VIDEO_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));

  return files.map((filename) => {
    const id = safeIdFromFilename(filename);
    const desc = path.basename(filename, path.extname(filename)).replace(/[_-]+/g, " ");
    return {
      id,
      url: `/media/${encodeURIComponent(filename)}`,
      author: "local_creator",
      description: desc || "本地视频",
      music: "♪ 本地音乐"
    };
  });
}

