<template>
  <div class="app">
    <TopTabs
      :active="activeTab"
      @change="activeTab = $event"
    />
    <VideoFeed :tab="activeTab" />
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TopTabs from "./components/TopTabs.vue";
import BottomNav from "./components/BottomNav.vue";
import VideoFeed from "./components/VideoFeed.vue";

const activeTab = ref("foryou");
</script>

<style scoped>
.app{
  position: relative;
  height: 100vh;
  height: 100svh;
  width: 100vw;
  overflow: hidden;
  background: #000;
}
</style>

