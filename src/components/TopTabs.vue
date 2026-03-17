<template>
  <div class="top" :style="{ paddingTop: `calc(10px + var(--safe-top))` }">
    <div class="left">
      <button class="icon" aria-label="Live">
        <SvgIcon name="live" />
      </button>
    </div>
    <div class="tabs" role="tablist" aria-label="Home Tabs">
      <button
        class="tab"
        :class="{ active: active === 'following' }"
        role="tab"
        @click="$emit('change', 'following')"
      >
        关注
      </button>
      <div class="sep" aria-hidden="true"></div>
      <button
        class="tab"
        :class="{ active: active === 'foryou' }"
        role="tab"
        @click="$emit('change', 'foryou')"
      >
        推荐
      </button>
    </div>
    <div class="right">
      <button class="icon" aria-label="Search">
        <SvgIcon name="search" />
      </button>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "./icons/SvgIcon.vue";

defineProps({
  active: {
    type: String,
    default: "foryou"
  }
});
defineEmits(["change"]);
</script>

<style scoped>
.top{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  gap: 8px;
  padding: 10px 8px 0 8px;
  pointer-events: none;
}
.left,.right{ display:flex; justify-content:center; pointer-events:auto; }
.icon{
  width: 44px;
  height: 44px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 999px;
}
.icon:active{ background: rgba(255,255,255,0.08); }
.tabs{
  pointer-events: auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
}
.tab{
  font-size: 16px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  padding: 10px 4px;
  line-height: 1;
}
.tab.active{
  color: rgba(255,255,255,0.98);
  text-shadow: 0 1px 10px rgba(0,0,0,0.35);
}
.sep{
  width: 1px;
  height: 14px;
  background: rgba(255,255,255,0.22);
}
</style>

