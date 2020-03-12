<template>
  <div class="container">
    <ul v-if="participants.length" class="plist">
      <template v-for="participant in participants">
        <li class="participant" :key="participant.sid">
          {{ participant.identity }}
        </li>
      </template>
    </ul>
    <div v-else class="plist-empty">
      <fa-icon icon="user-alt-slash" class="text-6xl" />
      <span class="block">
        No participants connected
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParticipantsList',
  props: {
    participants: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.container {
  @apply border-l p-2;
}
.plist, .plist-empty {
  @apply grid gap-2;
  align-content: start;
}

.plist-empty {
  @apply text-gray-400 h-full;
  place-items: center;
  align-content: center;
}

.participant {
  @apply border rounded p-2;
}

</style>
