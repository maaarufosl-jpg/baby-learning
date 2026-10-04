import React from 'react';
import {cancelRender, Composition, continueRender, delayRender} from 'remotion';
import {EpisodeVideo, episodeFrames, PreviewReel} from './components/Episode';
import {ep01} from './episodes/ep01';
import {loadAllFonts} from './fonts';

const FPS = 30;

const fontsHandle = delayRender('Loading Bengali and Arabic fonts');
loadAllFonts()
  .then(() => continueRender(fontsHandle))
  .catch((err) => cancelRender(err));

/** Moments of episode 1 shown in the motion preview (start second, length in seconds). */
const EP01_PREVIEW = [
  {start: 0, seconds: 4.5}, // title + nasheed
  {start: 8, seconds: 3}, // Ayan runs in
  {start: 27, seconds: 6.5}, // the mistake, Miu shakes its head
  {start: 35, seconds: 4}, // question mark
  {start: 40, seconds: 3.5}, // Ammu walks in
  {start: 61, seconds: 5}, // dua: syllables light up one by one
  {start: 66, seconds: 3}, // golden star
  {start: 86, seconds: 3.5}, // plate glow
  {start: 101, seconds: 5}, // "now you say it" with silence dots
  {start: 126.5, seconds: 5}, // right hand
  {start: 136, seconds: 4}, // Ayan eating with his right hand
  {start: 159, seconds: 4}, // end card
];

export const Root: React.FC = () => (
  <>
    <Composition
      id="Ep01"
      component={EpisodeVideo}
      durationInFrames={episodeFrames(ep01, false, FPS)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{episode: ep01, shorts: false}}
    />
    <Composition
      id="Ep01Shorts"
      component={EpisodeVideo}
      durationInFrames={episodeFrames(ep01, true, FPS)}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{episode: ep01, shorts: true}}
    />
    <Composition
      id="Ep01Preview"
      component={PreviewReel}
      durationInFrames={Math.round(EP01_PREVIEW.reduce((s, c) => s + c.seconds, 0) * FPS)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{episode: ep01, clips: EP01_PREVIEW}}
    />
  </>
);
