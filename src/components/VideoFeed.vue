<template>
  <div class="stage" ref="stageEl" @click="onStageTap">
    <div v-if="loading" class="center muted">加载中...</div>
    <div v-else-if="items.length === 0" class="center">
      <div class="title">没有发现视频</div>
      <div class="muted">暂无可播放的视频内容</div>
    </div>

    <div
      v-else
      class="track"
      :class="{ dragging: drag.active }"
      :style="trackStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @wheel.passive="onWheel"
    >
      <VideoSlide
        v-for="(item, i) in items"
        :key="item.id"
        :item="item"
        :active="i === activeIndex"
        :muted="muted"
        @request-toggle-mute="muted = !muted"
        @like="handleLike"
      />
    </div>

    <div class="toast" v-if="showUnmuteHint">点击屏幕开启声音</div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import VideoSlide from "./VideoSlide.vue";
import { getFeed, toggleLike } from "../data/mockData.js";

const props = defineProps({
  tab: {
    type: String,
    default: "foryou"
  }
});

const stageEl = ref(null);
const items = ref([]);
const loading = ref(true);
const activeIndex = ref(0);
const muted = ref(true);
const showUnmuteHint = ref(false);
const vh = ref(window.innerHeight);

const drag = ref({
  active: false,
  startY: 0,
  lastY: 0,
  deltaY: 0
});

const trackStyle = computed(() => {
  const baseY = -activeIndex.value * vh.value;
  const dragY = drag.value.active ? drag.value.deltaY : 0;
  return {
    transform: `translate3d(0, ${baseY + dragY}px, 0)`
  };
});

function loadFeed() {
  loading.value = true;
  // 模拟加载延迟
  setTimeout(() => {
    const data = getFeed();
    items.value = Array.isArray(data?.items) ? data.items : [];
    activeIndex.value = 0;
    loading.value = false;
  }, 300);
}

function clampIndex(next) {
  if (items.value.length === 0) return 0;
  return Math.max(0, Math.min(items.value.length - 1, next));
}

function go(delta) {
  activeIndex.value = clampIndex(activeIndex.value + delta);
}

let wheelLock = false;
function onWheel(e) {
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(() => (wheelLock = false), 320);
  if (Math.abs(e.deltaY) < 2) return;
  go(e.deltaY > 0 ? 1 : -1);
}

function onPointerDown(e) {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  drag.value.active = true;
  drag.value.startY = e.clientY;
  drag.value.lastY = e.clientY;
  drag.value.deltaY = 0;
  e.currentTarget?.setPointerCapture?.(e.pointerId);
}

function onPointerMove(e) {
  if (!drag.value.active) return;
  drag.value.lastY = e.clientY;
  drag.value.deltaY = e.clientY - drag.value.startY;
}

function onPointerUp() {
  if (!drag.value.active) return;
  const dy = drag.value.deltaY;
  drag.value.active = false;
  drag.value.deltaY = 0;
  const threshold = vh.value * 0.12;
  if (dy < -threshold) go(1);
  else if (dy > threshold) go(-1);
}

function onKey(e) {
  if (e.key === "ArrowDown") go(1);
  if (e.key === "ArrowUp") go(-1);
  if (e.key === " ") {
    e.preventDefault();
    muted.value = !muted.value;
  }
}

function onResize() {
  vh.value = window.innerHeight;
}

let tapTimer = null;
function onStageTap() {
  if (!muted.value) return;
  if (tapTimer) return;
  showUnmuteHint.value = true;
  tapTimer = setTimeout(() => {
    showUnmuteHint.value = false;
    tapTimer = null;
  }, 1200);
}

function handleLike(id) {
  const data = toggleLike(id);
  if (data) {
    const idx = items.value.findIndex((x) => x.id === id);
    if (idx >= 0) items.value[idx] = { ...items.value[idx], ...data };
  }
}

watch(
  () => props.tab,
  () => {
    loadFeed();
  }
);

onMounted(() => {
  loadFeed();
  window.addEventListener("keydown", onKey, { passive: false });
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.stage{
  position:absolute;
  inset:0;
  overflow:hidden;
}
.track{
  position:absolute;
  left:0; top:0;
  width:100%;
  will-change: transform;
  transition: transform 220ms ease-out;
  touch-action: none;
}
.track.dragging{ transition: none; }
.center{
  position:absolute;
  left:0; right:0;
  top: 45%;
  transform: translateY(-50%);
  text-align:center;
  padding: 0 18px;
}
.title{ font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.muted{ color: var(--muted); }
.toast{
  position:absolute;
  left:50%;
  bottom: calc(90px + var(--safe-bottom));
  transform: translateX(-50%);
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.12);
  font-size: 13px;
}
code{
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 12px;
  color: rgba(255,255,255,0.92);
}
</style>
