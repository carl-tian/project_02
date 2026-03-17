// 使用公开的示例视频 URL
export const mockVideos = [
  {
    id: "video-1",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "travel_lover",
    description: "壮丽的自然风光，让人心旷神怡",
    music: "原声 - 大自然的声音",
    liked: false,
    likes: 12800,
    comments: 456,
    shares: 128
  },
  {
    id: "video-2",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    author: "city_explorer",
    description: "城市夜景，灯火辉煌",
    music: "夜晚的城市 - 电子音乐",
    liked: true,
    likes: 8900,
    comments: 234,
    shares: 89
  },
  {
    id: "video-3",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    author: "food_master",
    description: "美食制作过程，看着就饿了",
    music: "烹饪时光 - 轻音乐",
    liked: false,
    likes: 23400,
    comments: 1200,
    shares: 567
  },
  {
    id: "video-4",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    author: "dance_queen",
    description: "跟我一起跳舞吧，释放你的热情",
    music: "热门舞曲 - DJ Mix",
    liked: false,
    likes: 45600,
    comments: 3400,
    shares: 2100
  },
  {
    id: "video-5",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    author: "tech_geek",
    description: "科技改变生活，未来已来",
    music: "科技感 - 电子合成",
    liked: false,
    likes: 6700,
    comments: 189,
    shares: 78
  }
];

// 创建响应式存储
let videoState = [...mockVideos];

export function getFeed() {
  return {
    items: videoState.map(v => ({ ...v }))
  };
}

export function toggleLike(id) {
  const video = videoState.find(v => v.id === id);
  if (video) {
    video.liked = !video.liked;
    video.likes = Math.max(0, video.likes + (video.liked ? 1 : -1));
    return { id, liked: video.liked, likes: video.likes };
  }
  return null;
}

export function resetState() {
  videoState = mockVideos.map(v => ({ ...v }));
}
