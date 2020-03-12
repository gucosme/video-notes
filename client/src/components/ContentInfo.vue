<template>
  <div class="video-info">
    <span>{{ name }}</span>
    <fa-icon v-on:click.stop="toggle('mic')" :icon="mic ? 'microphone' : 'microphone-slash'" class="mic controls" />
    <fa-icon v-on:click.stop="toggle('video')" :icon="video ? 'video' : 'video-slash'" class="video controls" />
  </div>
</template>

<script>
export default {
  name: 'ContentInfo',
  data: () => ({
    mic: false,
    video: false,
  }),
  props: {
    name: String,
  },
  methods: {
    toggle(control) {
      this[control] = !this[control];
    }
  }
}
</script>

<style scoped>
.video-info {
  @apply absolute z-10 p-2 text-white flex items-center;
  @apply bottom-0 right-0 left-0;
  @apply bg-gray-900 opacity-75;
}

.video-info > span {
  @apply flex-grow;
}

.controls {
  @apply ml-2;
}

.controls:hover {
  @apply text-gray-400 cursor-pointer;
}
</style>
