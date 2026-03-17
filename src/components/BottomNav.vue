<template>
  <div class="bottom" :style="{ paddingBottom: `calc(8px + var(--safe-bottom))` }">
    <button class="item active" aria-label="Home">
      <SvgIcon name="home" />
      <div class="label">首页</div>
    </button>
    <button class="item" aria-label="Discover">
      <SvgIcon name="discover" />
      <div class="label">朋友</div>
    </button>
    <button class="add" aria-label="Add">
      <span class="plus">+</span>
    </button>
    <button class="item" aria-label="Inbox">
      <SvgIcon name="inbox" />
      <div class="label">消息</div>
    </button>
    <button class="item" aria-label="Profile">
      <SvgIcon name="me" />
      <div class="label">我</div>
    </button>
  </div>
</template>

<script setup>
import SvgIcon from "./icons/SvgIcon.vue";
</script>

<style scoped>
.bottom{
  position:absolute;
  left:0; right:0; bottom:0;
  z-index: 40;
  height: 64px;
  display:flex;
  align-items:center;
  justify-content: space-around;
  gap: 4px;
  padding: 0 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0.0));
}
.item{
  width: 64px;
  height: 56px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap: 4px;
  color: rgba(255,255,255,0.76);
}
.item.active{ color: rgba(255,255,255,0.96); }
.label{
  font-size: 11px;
  line-height: 1;
}
.add{
  width: 52px;
  height: 34px;
  border-radius: 10px;
  background: #fff;
  position: relative;
}
.add::before{
  content:"";
  position:absolute;
  left:-6px; top:0; bottom:0;
  width: 10px;
  border-radius: 10px;
  background: #2af;
}
.add::after{
  content:"";
  position:absolute;
  right:-6px; top:0; bottom:0;
  width: 10px;
  border-radius: 10px;
  background: var(--accent);
}
.plus{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#000;
  font-size: 26px;
  font-weight: 800;
  transform: translateY(-1px);
}
</style>

