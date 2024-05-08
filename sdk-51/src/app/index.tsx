import type { AVPlaybackStatus } from "expo-av";
import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function AudioPlayground() {
  const soundRef = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [positionMs, setPositionMs] = useState(0);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPositionMs(status.positionMillis);
      if (status.didJustFinish) setFinished(true);
    }
  }, []);

  const loadSound = useCallback(async () => {
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) {
      await soundRef.current.unloadAsync();
      await soundRef.current.loadAsync(require("@/assets/audio/silence.mp3"));
      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setLoaded(true);
    }
  }, []);

  const playPauseTrack = useCallback(async () => {
    if (isPlaying) await soundRef.current.pauseAsync();
    else await soundRef.current.playAsync();
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  useEffect(() => {
    loadSound();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Pressable
          style={{
            borderRadius: 16,
            padding: 16,
            backgroundColor: isPlaying ? "#f54242" : "#4287f5",
          }}
          onPress={playPauseTrack}
          disabled={!loaded}
        >
          <Text style={{ color: "white", fontSize: 24 }}>
            {isPlaying ? "Pause" : "Play"} Track
          </Text>
        </Pressable>
      </View>
      <View>
        <Text style={{ fontWeight: "bold" }}>
          Loaded:{" "}
          <Text style={{ fontWeight: "normal" }}>{JSON.stringify(loaded)}</Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Finished:{" "}
          <Text style={{ fontWeight: "normal" }}>
            {JSON.stringify(finished)}
          </Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Current Position:{" "}
          <Text style={{ fontWeight: "normal" }}>{positionMs / 1000}s</Text>
        </Text>
      </View>
    </View>
  );
}
