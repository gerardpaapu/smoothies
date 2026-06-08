import spritesheetUrl from '../../assets/character-spritesheet.png';

const atlasData = {
  frames: {} as Record<string, any>,
  meta: {
    image: spritesheetUrl,
    format: 'RGBA8888',
    size: { w: 216, h: 208 },
    scale: 1,
  },
  animations: {} as Record<string, Array<string>>,
};

let character = 0;
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 4; j++) {
    if (i == 1 && j == 0) continue;
    character++;
    for (let k = 0; k < 4; k++) {
      let d = ['down', 'left', 'right', 'up'][k];
      let animation = [] as Array<string>;
      atlasData.animations[`character_${character}__walking_${d}`] = animation;
      for (let l = 0; l < 3; l++) {
        const frame_name = `character_${character}__walking_${d}_${l}`;
        atlasData.frames[frame_name] = {
          frame: { x: (j * 3 + l) * 18, y: (i * 4 + k) * 26, w: 18, h: 26 },
          sourceSize: { w: 18, h: 26 },
          spriteSourceSize: { x: 0, y: 0, w: 18, h: 26 },
          anchor: { x: 0.5, y: 1 },
        };
        animation.push(frame_name);
      }
    }
  }
}

export default atlasData;
