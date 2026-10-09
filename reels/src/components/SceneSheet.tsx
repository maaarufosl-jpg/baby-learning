import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SCENES} from '../data/scenes';
import {Nature} from './Nature';

/** Contact sheet of every drawn scene (6 × 6), for checking the art in one picture. */
export const SceneSheet: React.FC = () => (
  <AbsoluteFill style={{background: '#111', flexDirection: 'row', flexWrap: 'wrap'}}>
    {Object.entries(SCENES).map(([key, scene]) => (
      <div key={key} style={{width: 180, height: 320, overflow: 'hidden', position: 'relative'}}>
        <div style={{width: 1080, height: 1920, transform: 'scale(0.16667)', transformOrigin: '0 0', position: 'absolute'}}>
          <Nature scene={scene} seconds={8} />
        </div>
        <div style={{position: 'absolute', bottom: 2, left: 4, fontSize: 14, color: '#fff', textShadow: '0 0 3px #000', fontFamily: 'sans-serif'}}>{key}</div>
      </div>
    ))}
  </AbsoluteFill>
);
