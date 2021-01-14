import React, { useEffect, useState } from "react";

import "./SASS/main.scss";

import { connectBackgroundTransitionGroup } from "./utilities/connectBackgroundTransition";

import Loader from "./components/Loader";

import Jitsi from "react-jitsi";

const App = () => {
  const [displayName, setDisplayName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [onCall, setOnCall] = useState(false);

  useEffect(() => {
    if (onCall === true) {
      connectBackgroundTransitionGroup.onConnect();
    } else if (onCall === false) {
      connectBackgroundTransitionGroup.onDisconnect();
    }
  }, [onCall]);

  return (
    <div className="container-fluid main-container">
      <div id="video-full" class="video-full">
          <div class="video-full__overlay"></div>
          <iframe title="video" class="hidden-mobile" src="https://player.vimeo.com/video/454635435?background=1&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;muted=1" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
      <div className={onCall ? "row my-1" : "row my-5"}>
        <div className="col">
          <div className="my-wrap">JITSI LIVE VIDEO CALL</div>
          <div className={onCall ? "jisti-container" : ""}>
            {onCall ? (
              <Jitsi
                roomName={roomName}
                displayName={displayName}
                loadingComponent={Loader}
                onAPILoad={(JitsiMeetAPI) =>
                  JitsiMeetAPI.addEventListener("videoConferenceLeft", () => {
                    window.location.href = "/";
                  })
                }
                config={{
                  prejoinPageEnabled: false,
                  disableDeepLinking: true,
                  transcribingEnabled: true
                }}
                interfaceConfig={{
                  APP_NAME: "Jitsi Chat",
                  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                  DISABLE_TRANSCRIPTION_SUBTITLES: false,
                  LANG_DETECTION: true,
                  TOOLBAR_BUTTONS: [
                    "microphone",
                    "camera",
                    "closedcaptions",
                    "desktop",
                    "fullscreen",
                    "fodeviceselection",
                    "hangup",
                    "profile",
                    "info",
                    "chat",
                    "recording",
                    "livestreaming",
                    "etherpad",
                    "sharedvideo",
                    "settings",
                    "raisehand",
                    "videoquality",
                    "filmstrip",
                    "invite",
                    "feedback",
                    "stats",
                    "shortcuts",
                    "tileview",
                    "videobackgroundblur",
                    "download",
                    "help",
                    "mute-everyone"
                  ],
                  TOOLBAR_ALWAYS_VISIBLE: true
                }}
              />
            ) : (
              <div className="my-wrap" style={{ height: "70vh" }}>
                <p className="my-ptag">Create / Join a Room</p>
                <input
                  className="my-input"
                  type="text"
                  placeholder="Room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                  className="my-input"
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <button className="my-button" onClick={() => setOnCall(true)}>
                  <div className="connect">
                    <span className="px-4">CONNECT</span>
                  </div>
                </button>
              </div>
            )}
          </div>
          <div
            onClick={() => setOnCall(false)}
            className="my-wrap p-1 pb-2 my-name"
          >
            2021 JITSI VIDEO CALL&nbsp;
            {onCall ? (
              <span className="goBack ml-5">GO BACK&nbsp;&#8676;</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
