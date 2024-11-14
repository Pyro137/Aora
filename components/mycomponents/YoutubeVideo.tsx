// React Native example using 'react-native-youtube-iframe'
import YouTube from "react-native-youtube-iframe";

export function VideoPlayer({ videoId }) {
  return (
    <YouTube
      videoId={videoId} // e.g., "dQw4w9WgXcQ"
      height={200}
    />
  );
}
