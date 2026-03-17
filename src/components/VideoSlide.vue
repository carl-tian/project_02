<template>
  <section class="slide" :style="{ height: `${vh}px` }">
    <video
      ref="videoEl"
      class="video"
      :src="item.url"
      :muted="muted"
      playsinline
      preload="metadata"
      loop
      @timeupdate="onTimeUpdate"
      @click.stop="toggleMute"
    ></video>

    <div class="shade" aria-hidden="true"></div>

    <div class="leftInfo">
      <div class="handle">@{{ item.author }}</div>
      <div class="desc">{{ item.description }}</div>
      <div class="meta muted">
        <span>{{ item.music }}</span>
        <span class="dot">·</span>
        <span>{{ muted ? "静音" : "有声" }}</span>
      </div>
    </div>

    <ActionBar
      class="rightBar"
      :liked="item.liked"
      :likes="item.likes"
      :comments="item.comments"
      :shares="item.shares"
      @like="$emit('like', item.id)"
    />

    <div class="progress">
      <div class="bar" :style="{ transform: `scaleX(${progress})` }"></div>
    </div>

    <div
      v-if="showHeart"
      class="bigHeart"
      aria-hidden="true"
      :style="{ left: `${heartX}px`, top: `${heartY}px` }"
    >
      ❤
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ActionBar from "./parts/ActionBar.vue";

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
  muted: { type: Boolean, default: true }
});
const emit = defineEmits(["request-toggle-mute", "like"]);

const videoEl = ref(null);
const vh = ref(window.innerHeight);
const progress = ref(0);

const showHeart = ref(false);
const heartX = ref(0);
const heartY = ref(0);

let lastTapAt = 0;

function onResize() {
  vh.value = window.innerHeight;
}

function toggleMute() {
  emit("request-toggle-mute");
}

function onTimeUpdate() {
  const v = videoEl.value;
  if (!v || !v.duration) return;
  progress.value = Math.min(1, Math.max(0, v.currentTime / v.duration));
}

function stop() {
  const v = videoEl.value;
  if (!v) return;
  v.pause();
}

async function play() {
  const v = videoEl.value;
  if (!v) return;
  try {
    await v.play();
  } catch {
    // autoplay might be blocked until user interaction
  }
}

function onDblTapLike(e) {
  const now = Date.now();
  const dt = now - lastTapAt;
  lastTapAt = now;
  if (dt > 260) return;
  emit("like", props.item.id);

  const rect = e.currentTarget.getBoundingClientRect();
  heartX.value = e.clientX - rect.left - 12;
  heartY.value = e.clientY - rect.top - 12;
  showHeart.value = true;
  setTimeout(() => (showHeart.value = false), 520);
}

watch(
  () => props.active,
  async (isActive) => {
    if (isActive) {
      await nextTick();
      await play();
    } else {
      stop();
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("resize", onResize);
  // double tap handler on whole slide
  const el = videoEl.value?.parentElement;
  if (el) el.addEventListener("pointerdown", onDblTapLike, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
  const el = videoEl.value?.parentElement;
  if (el) el.removeEventListener("pointerdown", onDblTapLike);
});
</script>

<style scoped>
.slide{
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}
.video{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shade{
  position:absolute;
  left:0; right:0; bottom:0;
  height: 42%;
  background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0));
  pointer-events:none;
}
.leftInfo{
  position:absolute;
  left: 12px;
  right: 90px;
  bottom: calc(90px + var(--safe-bottom));
  z-index: 10;
}
.handle{ font-weight: 800; font-size: 16px; margin-bottom: 6px; }
.desc{
  font-size: 14px;
  line-height: 1.25;
  margin-bottom: 8px;
  text-shadow: 0 2px 16px rgba(0,0,0,0.6);
}
.meta{
  display:flex;
  align-items:center;
  gap: 8px;
  font-size: 12px;
}
.dot{ opacity: 0.6; }
.muted{ color: var(--muted); }
.rightBar{
  position:absolute;
  right: 10px;
  bottom: calc(98px + var(--safe-bottom));
  z-index: 20;
}
.progress{
  position:absolute;
  left:0; right:0;
  bottom: calc(64px + var(--safe-bottom));
  height: 2px;
  background: rgba(255,255,255,0.18);
  z-index: 25;
  transform-origin: left;
}
.bar{
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.86);
  transform-origin: left;
}
.bigHeart{
  position:absolute;
  z-index: 50;
  font-size: 42px;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 4px 18px rgba(0,0,0,0.6);
  animation: pop 520ms ease-out forwards;
  pointer-events:none;
}
@keyframes pop{
  0%{ transform: scale(0.6); opacity: 0.0; }
  20%{ opacity: 1; }
  100%{ transform: scale(1.3) translateY(-12px); opacity: 0; }
}
</style>
