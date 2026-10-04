/** Positions of overlays (speech, dua panel, etc.) for landscape and portrait frames. */
export type Layout = {
  portrait: boolean;
  stageScale: number;
  stageLeft: number;
  stageTop: number;
  speechTop: number;
  speechMaxW: number;
  speechFont: number;
  duaTop: number;
  duaTopNoSpeech: number;
  duaW: number;
  cardCenterX: number;
  cardTop: number;
  cardW: number;
  silenceY: number;
  questionX: number;
  questionY: number;
  starX: number;
  starY: number;
  handX: number;
  handY: number;
  titleTop: number;
};

export const getLayout = (width: number, height: number): Layout => {
  const portrait = height > width;
  if (!portrait) {
    return {
      portrait,
      stageScale: width / 1920,
      stageLeft: 0,
      stageTop: 0,
      speechTop: 46,
      speechMaxW: 1500,
      speechFont: 60,
      duaTop: 290,
      duaTopNoSpeech: 190,
      duaW: 1240,
      cardCenterX: 1350,
      cardTop: 330,
      cardW: 880,
      silenceY: 900,
      questionX: 1380,
      questionY: 360,
      starX: 1720,
      starY: 210,
      handX: 960,
      handY: 560,
      titleTop: 90,
    };
  }
  // Portrait (Shorts): the 1920x1080 stage sits as a band at the bottom, overlays use the top area.
  const stageScale = (width / 1920) * 1.25;
  const stageW = 1920 * stageScale;
  const stageH = 1080 * stageScale;
  return {
    portrait,
    stageScale,
    stageLeft: (width - stageW) / 2,
    stageTop: height - stageH,
    speechTop: 120,
    speechMaxW: 980,
    speechFont: 56,
    duaTop: 420,
    duaTopNoSpeech: 300,
    duaW: 1000,
    cardCenterX: width / 2,
    cardTop: 400,
    cardW: 980,
    silenceY: 1080,
    questionX: width / 2,
    questionY: 760,
    starX: 900,
    starY: 330,
    handX: width / 2,
    handY: 780,
    titleTop: 200,
  };
};
