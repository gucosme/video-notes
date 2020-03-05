import Video from "twilio-video";

const connect = function(token, opts) {
  return Video.connect(token, {
    ...opts,
    audio: true,
    video: { width: 640 }
  });
};

const createLocalTrack = (width = 640) => {
  return Video.createLocalTracks({
    audio: true,
    video: { width }
  });
};

const attachRoomListeners = function(room, el) {
  room.on("participantConnected", participant => {
    console.log(`Participant ${participant.identity} connected`);
    for (const pub of participant.tracks) {
      if (pub.isSubscribed) {
        el.appendChild(pub.track.attach());
      }
    }

    participant.on("trackSubscribed", track => {
      el.appendChild(track.attach());
    });
  });
};

export default {
  connect,
  createLocalTrack,
  attachRoomListeners
};
