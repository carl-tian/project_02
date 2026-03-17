<template>
  <div class="bar">
    <button class="avatar" aria-label="Avatar">
      <div class="ring"></div>
      <div class="face">👤</div>
      <div class="follow">+</div>
    </button>

    <button class="action" aria-label="Like" @click="$emit('like')">
      <div class="icon" :class="{ liked }">❤</div>
      <div class="count">{{ fmt(likes) }}</div>
    </button>

    <button class="action" aria-label="Comment">
      <div class="icon">💬</div>
      <div class="count">{{ fmt(comments) }}</div>
    </button>

    <button class="action" aria-label="Share">
      <div class="icon">↗</div>
      <div class="count">{{ fmt(shares) }}</div>
    </button>

    <div class="disc" aria-hidden="true"></div>
  </div>
</template>

<script setup>
defineProps({
  liked: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 }
});
defineEmits(["like"]);

function fmt(n) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}w`.replace(".0", "");
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`.replace(".0", "");
  return String(n ?? 0);
}
</script>

<style scoped>
.bar{
  width: 66px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: 14px;
  user-select: none;
}
.avatar{
  position:relative;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.ring{
  position:absolute;
  inset: 4px;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,0.85);
  box-shadow: 0 8px 22px rgba(0,0,0,0.35);
}
.face{
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(6px);
  font-size: 18px;
}
.follow{
  position:absolute;
  bottom: -4px;
  left:50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--accent);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 10px 18px rgba(0,0,0,0.35);
}
.action{
  width: 66px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: 6px;
}
.icon{
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 24px;
  background: rgba(0,0,0,0.18);
  text-shadow: 0 8px 20px rgba(0,0,0,0.6);
}
.icon.liked{ color: var(--accent); }
.count{
  font-size: 12px;
  font-weight: 700;
  text-shadow: 0 6px 18px rgba(0,0,0,0.55);
}
.disc{
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 3px solid rgba(255,255,255,0.18);
  background:
    radial-gradient(circle at 40% 40%, rgba(255,255,255,0.35), rgba(255,255,255,0.0) 55%),
    linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05));
  animation: spin 2.2s linear infinite;
}
@keyframes spin{ from{ transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>

