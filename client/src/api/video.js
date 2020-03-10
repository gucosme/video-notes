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

const attachRoomListeners = function(room, attachM, addP, removeP, nextTick) {
  const attachParticipant = (p, local = false) => {
    addP(p);

    nextTick(() => {
      for (const pub of p.tracks.values()) {
        if (pub.isSubscribed || local) attachM(pub.track, p.sid);

        pub.on("subscribed", track => {
          attachM(track, p.sid);
        });
      }
    });
  };

  attachParticipant(room.localParticipant, true);
  room.participants.forEach(p => attachParticipant(p));

  room.on("participantConnected", participant => {
    addP(participant);

    participant.on("trackSubscribed", track => {
      attachM(track, participant.sid);
    });
  });

  room.on("participantDisconnected", participant => {
    removeP(participant);
  });
};

export default {
  connect,
  createLocalTrack,
  attachRoomListeners
};
