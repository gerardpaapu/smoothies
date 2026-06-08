import Position from '../components/position.js';
import SpriteName from '../components/sprite-name.js';
import Goal from '../components/goal.js';
import atlasData from './build-sprite-sheet.js';
import buildIndex from '../lib/build-index.js';
import bucketTextureFile from '../../assets/bucket.png';
import blenderTextureFile from '../../assets/blender.png';
import {
  Application,
  Assets,
  Sprite,
  Spritesheet,
  AnimatedSprite,
} from 'pixi.js';
import { Direction } from '../utils/location.js';

const query = buildIndex([SpriteName, Position]);

let appPromise: Promise<Application> | undefined = undefined;

async function createApp() {
  const app = new Application();

  await app.init({ background: '#1099bb', height: 400, width: 600 });
  document.body.appendChild(app.canvas);
  return app;
}

async function getApp() {
  appPromise ??= createApp();
  return await appPromise;
}

const sprites = new Map() as Map<
  number,
  { sprite: AnimatedSprite; lastUsed: number; name: string }
>;
let frameCount = 0;
export async function render() {
  const app = await getApp();
  const blenderTexture = await Assets.load(blenderTextureFile);
  const bucketTexture = await Assets.load(bucketTextureFile);

  const texture = await Assets.load(atlasData.meta.image);
  const spritesheet = new Spritesheet(texture, atlasData);

  await spritesheet.parse();

  frameCount++;
  frameCount %= 2;

  for (const entity of query.getEntities()) {
    const position = Position.get(entity)!;
    const { spritename } = SpriteName.get(entity)!;
    let entry = sprites.get(entity);
    let animation;

    const character = `character_${(entity % 7) + 1}`;
    switch (position.d) {
      case Direction.UP:
        animation = spritesheet.animations[`${character}__walking_up`];
        break;
      case Direction.LEFT:
        animation = spritesheet.animations[`${character}__walking_left`];
        break;
      case Direction.RIGHT:
        animation = spritesheet.animations[`${character}__walking_right`];
        break;
      case Direction.DOWN:
      default:
        animation = spritesheet.animations[`${character}__walking_down`];
        break;
    }

    if (entry == null || entry.name !== spritename) {
      let sprite = new AnimatedSprite(animation!);
      sprite.play();

      app.stage.addChild(sprite);
      entry = { sprite, lastUsed: frameCount, name: spritename };
      sprites.set(entity, entry);
    }

    const { sprite } = entry!;
    if (sprite.textures !== animation) {
      sprite.textures = animation!;
    }

    if (!sprite.playing) {
      sprite.play();
    }
    sprite.x = position.x;
    sprite.y = position.y;
    sprite.zIndex = position.y;
    entry.lastUsed = frameCount;
  }

  for (const [key, slot] of sprites.entries()) {
    if (slot.lastUsed !== frameCount) {
      app.stage.removeChild(slot.sprite);
      slot.sprite.destroy();
      sprites.delete(key);
    }
  }
}
