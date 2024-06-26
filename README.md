> [!IMPORTANT]  
> Fixed with `expo-av@14.0.4` — **working with development build**, not yet with Expo Go (probably fixed in a future update).
>
> **Edit 5/14/2024:** Seems to work in Expo Go as seen in the [SDK 51 Snack](https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_51?platform=android) (probably fixed with `expo@51.0.6`).
>
> **Edit:** Having `Client version 2.31.2` for the Expo Go app also seems to be required.

# [Android] `Sound.setOnPlaybackStatusUpdate()` Issue From SDK 50 to SDK 51

According to the docs, the expected behavior of `Sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)` is:

> `onPlaybackStatusUpdate` will be called whenever a call to the API for this playback object completes (such as `setStatusAsync()`, `getStatusAsync()`, or `unloadAsync()`), nd will also be called at regular intervals while the media is in the loaded state.
>
> Set `progressUpdateIntervalMillis` via `setStatusAsync()` or `setProgressUpdateIntervalAsync()` to modify the interval with which `onPlaybackStatusUpdate` is called while loaded.

In SDK 50, this was all true. However, in SDK 51, `onPlaybackStatusUpdate` is never called in regular intervals including when the audio finishes playing. It's only called when we manually call the playback object with some other function.

## Snacks

SDK 50: [https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_50?platform=android](https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_50?platform=android)

SDK 51: [https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_51?platform=android](https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_51?platform=android)

# Getting Started

1. Go to directory of SDK version you want to test.

```
cd sdk-51
```

2. Install dependencies.

```
npm install
```

3. Start the app.

```
npx expo start --clear
```
