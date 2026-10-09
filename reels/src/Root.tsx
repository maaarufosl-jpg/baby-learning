import React from 'react';
import {cancelRender, Composition, continueRender, delayRender} from 'remotion';
import {BrandOptions} from './components/BrandOptions';
import {REEL_SECONDS, ReelVideo} from './components/Reel';
import {reels} from './data/reels';
import {loadAllFonts} from './fonts';

const FPS = 30;

const fontsHandle = delayRender('Loading Bengali and Arabic fonts');
loadAllFonts()
  .then(() => continueRender(fontsHandle))
  .catch((err) => cancelRender(err));

export const Root: React.FC = () => (
  <>
    {reels.map((r) => (
      <Composition key={r.id} id={r.id} component={ReelVideo} durationInFrames={REEL_SECONDS * FPS} fps={FPS} width={1080} height={1920} defaultProps={{reel: r}} />
    ))}
    <Composition id="BrandOptions" component={BrandOptions} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
