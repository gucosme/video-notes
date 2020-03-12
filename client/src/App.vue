<template>
  <div id="app">
    <nav class="header">
      <h2>
        <fa-icon icon="shapes" class="mr-2" />
          CLA<span class="text-gray-900">SS</span>ROOM
      </h2>
    </nav>

    <div class="main">
      <template v-for="participant in participants">
        <div class="main-content" :key="participant.sid" :ref="participant.sid">
          <ContentInfo :name="participant.identity" />
        </div>
      </template>
    </div>
    <ParticipantsList :participants="participants" class="sidebar" />
    <div class="settings">
      <fa-icon icon="cog" />
    </div>
    <footer>Made with VueJS and Twilio-Video</footer>
  </div>
</template>

<script>
import { getToken } from './api/auth';
import video from './api/video';

import ParticipantsList from './components/ParticipantsList.vue';
import ContentInfo from './components/ContentInfo.vue';

export default {
  name: 'App',
  components: {
    ParticipantsList,
    ContentInfo
  },
  data: () => ({
    room: null,
    participants: [],
    devices: [],
  }),
  methods: {
    addParticipant(p) {
      this.participants.push(p);
    },
    removeParticipants(p) {
      console.log(p.identity);
      this.participants.splice(this.participants.indexOf(p), 1);
    },
    attachMedia(media, ref) {
      const el = this.$refs[ref][0] || this.$refs[ref];
      el.appendChild(media.attach());
    }
  },
  async mounted () {
    const { query } = this.$route;

    try {
      this.devices = await navigator.mediaDevices.enumerateDevices()

      const token = await getToken(query.name);
      const localTracks = await video.createLocalTrack(query.type === 'teacher');

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
  @apply font-sans subpixel-antialiased h-screen;
  @apply grid grid-cols-4 gap-1;
  grid-template-rows: 3rem auto 2rem 2rem;
  grid-template-areas:
    "header header header header"
    "main main main sidebar"
    "main main main settings"
    "footer footer footer footer";
}

.main-content > video {
  @apply h-full;
  place-self: center;
}

.main-content > audio {
  display: none;
}

</style>

<style scoped>
.header {
  @apply grid shadow font-bold text-gray-900;
  grid-area: header;
  place-items: center;
  color: #1865f2;
  font-family: 'Permanent Marker', cursive;
}

.sidebar {
  grid-area: sidebar;
}

.settings {
  @apply grid pr-2;
  grid-area: settings;
  align-content: center;
  justify-content: end;
}

footer {
  @apply grid bg-gray-800 text-gray-500 text-xs border-t-2;
  grid-area: footer;
  place-items: center;
}

.main {
  grid-area: main;
}

.main-content {
  @apply relative h-full;
  @apply grid grid-cols-1 grid-rows-1;
}

</style>
