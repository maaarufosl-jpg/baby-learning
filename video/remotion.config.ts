import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('swangle');

// On machines without a bundled Chrome download, point Remotion at an existing binary:
//   REMOTION_BROWSER_EXECUTABLE=/path/to/chrome npm run render:ep01
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
