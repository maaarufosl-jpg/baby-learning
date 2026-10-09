import React from 'react';
import {cancelRender, Composition, continueRender, delayRender} from 'remotion';
import {ClipEpisode, clipEpisodeFrames} from './components/ClipEpisode';
import {Ep01Thumbnail} from './components/Thumbnail';
import {SHORT_BISMILLAH, SHORT_RIGHT_HAND, shortFrames, ShortVideo} from './components/Shorts';
import {FacebookCover, ProfilePicture, YouTubeBanner} from './components/Brand';
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
  {start: 13, seconds: 3}, // Umayer runs in
  {start: 32, seconds: 6.5}, // the mistake, Miu shakes its head
  {start: 40, seconds: 4}, // question mark
  {start: 45, seconds: 3.5}, // Ammu walks in
  {start: 66, seconds: 5}, // dua: syllables light up one by one
  {start: 71, seconds: 3}, // golden star
  {start: 91, seconds: 3.5}, // plate glow
  {start: 106, seconds: 5}, // "now you say it" with silence dots
  {start: 131.5, seconds: 5}, // right hand
  {start: 141, seconds: 4}, // Umayer eating with his right hand
  {start: 164, seconds: 4}, // end card
];

export const Root: React.FC = () => (
  <>
    <Composition id="ShortBismillah" component={ShortVideo} durationInFrames={shortFrames(SHORT_BISMILLAH)} fps={FPS} width={1080} height={1920} defaultProps={{spec: SHORT_BISMILLAH}} />
    <Composition id="ShortRightHand" component={ShortVideo} durationInFrames={shortFrames(SHORT_RIGHT_HAND)} fps={FPS} width={1080} height={1920} defaultProps={{spec: SHORT_RIGHT_HAND}} />
    <Composition id="YouTubeBanner" component={YouTubeBanner} durationInFrames={1} fps={FPS} width={2560} height={1440} />
    <Composition id="FacebookCover" component={FacebookCover} durationInFrames={1} fps={FPS} width={1640} height={624} />
    <Composition id="ProfilePicture" component={ProfilePicture} durationInFrames={1} fps={FPS} width={1080} height={1080} />
    <Composition id="Ep01Thumbnail" component={Ep01Thumbnail} durationInFrames={1} fps={FPS} width={1280} height={720} />
    <Composition id="Ep01Clips" component={ClipEpisode} durationInFrames={clipEpisodeFrames(FPS)} fps={FPS} width={1920} height={1080} />
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
