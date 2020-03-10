<template>
  <div id="app">
    <h2>Claxroom</h2>

    <div class="streams">

      <template v-for="participant in participants">
        <div class="participant" :key="participant.sid">
          <div :ref="participant.sid" />
            <span class="participant-name">{{ participant.identity }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getToken } from './api/auth';
import video from './api/video';

export default {
  name: 'App',
  data: () => ({
    room: null,
    participants: []
  }),
  watch: {
    participants: function(val, oldVal) {
      console.log(val.length, oldVal.length);
    },
  },
  methods: {
    addParticipant(p) {
      this.participants.push(p);
    },
    removeParticipants(p) {
      this.participants.splice(this.participants.indexOf(p), 1);
    },
    attachMedia(media, ref) {
      const el = this.$refs[ref][0] || this.$refs[ref];
      el.appendChild(media.attach());
    }
  },
  async mounted () {
    try {
      const token = await getToken();
      const localTracks = await video.createLocalTrack();

      const room = await video.connect(token, {
        name: 'room01',
        tracks: localTracks,
      });

      console.log(`Room ${room.sid} - ${room.name} connected`);

      this.room = room;
      video.attachRoomListeners(this.room, this.attachMedia, this.addParticipant, this.removeParticipants, this.$nextTick);
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

.streams {
  display: grid;
}

.participant {
  position: relative;
  min-height: 480px;
}

.participant-name {
  position: absolute;
  z-index: 1;
  bottom: 0;
  margin: .5rem;
  color: white;
}
</style>
