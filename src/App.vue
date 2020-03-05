<template>
  <div id="app">
    <h2>Video Notes</h2>
    <div ref="video" />
    <div ref="audio" />
  </div>
</template>

<script>
import { getToken } from './api/auth';
import video from './api/video';

export default {
  name: 'App',
  data: () => ({
    room: null,
  }),
  methods: {
    attachMedia(media) {
      const videoEl = this.$refs[media.kind];
      videoEl.appendChild(media.attach());
    }
  },
  async mounted () {
    try {
      const token = await getToken();
      const localTracks = await video.createLocalTrack();
      console.log(localTracks);

      for (const track of localTracks) this.attachMedia(track);

      const room = await video.connect(token, {
        name: 'room01',
        tracks: localTracks,
      });

      console.log(`Room ${room.sid} - ${room.name} connected`);

      this.room = room;
      // video.attachRoomListeners(this.room, videoEl);
    } catch (ex) {
      console.log(ex.name,ex.message);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  font-size: 1.5rem;
}
</style>
