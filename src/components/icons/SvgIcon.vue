<template>
  <svg
    v-if="name === 'search'"
    class="svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M10.5 3a7.5 7.5 0 1 1 4.64 13.39l4.49 4.49-1.41 1.41-4.49-4.49A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
    />
  </svg>

  <svg v-else-if="name === 'home'" class="svg" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 3 3 10v11h7v-6h4v6h7V10l-9-7Zm-1 16H5v-8.05l7-5.44 7 5.44V19h-6v-6h-2v6Z"/>
  </svg>

  <svg v-else-if="name === 'discover'" class="svg" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm3.8-12.2-2.2 5.6-5.6 2.2 2.2-5.6 5.6-2.2Zm-3.2 3.2a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/>
  </svg>

  <svg v-else-if="name === 'inbox'" class="svg" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v16h20V5a2 2 0 0 0-2-2ZM4 5h16v9h-4.6l-1.2 2H9.8l-1.2-2H4V5Zm16 14H4v-3h3.4l1.2 2h6.8l1.2-2H20v3Z"/>
  </svg>

  <svg v-else-if="name === 'me'" class="svg" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.41 0-8 2.24-8 5v1h16v-1c0-2.76-3.59-5-8-5Z"/>
  </svg>

  <svg v-else-if="name === 'live'" class="svg" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 5h12a2 2 0 0 1 2 2v2.5l2.4-1.6a1 1 0 0 1 1.6.83v6.54a1 1 0 0 1-1.6.83L18 14.5V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h12V7H4Z"/>
  </svg>

  <span v-else class="fallback">?</span>
</template>

<script setup>
defineProps({
  name: { type: String, required: true }
});
</script>

<style scoped>
.svg{
  width: 26px;
  height: 26px;
  color: rgba(255,255,255,0.92);
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.45));
}
.fallback{
  display:inline-block;
  width: 26px;
  text-align:center;
}
</style>

