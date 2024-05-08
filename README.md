# [Android] `Sound.setOnPlaybackStatusUpdate()` Issue From SDK 50 to SDK 51

According to the docs, the expected behavior of `Sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)` is:

> `onPlaybackStatusUpdate` will be called whenever a call to the API for this playback object completes (such as `setStatusAsync()`, `getStatusAsync()`, or `unloadAsync()`), nd will also be called at regular intervals while the media is in the loaded state.
>
> Set `progressUpdateIntervalMillis` via `setStatusAsync()` or `setProgressUpdateIntervalAsync()` to modify the interval with which `onPlaybackStatusUpdate` is called while loaded.

In SDK 50, this was all true. However, in SDK 51, `onPlaybackStatusUpdate` is never called in regular intervals including when the audio finishes playing. It's only called when we manually call the playback object with some other function.

## Snacks

SDK 50: [https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_50?platform=android](https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_50?platform=android)

SDK 51: [https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_51?platform=android](https://snack.expo.dev/@missingcore/setonplaybackstatusupdate-sdk_51?platform=android)
