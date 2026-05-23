// True atomic tastes
export const SALTY = 'FLAVOUR/SALTY';
export const SOUR = 'FLAVOUR/SOUR';
export const SWEET = 'FLAVOUR/SWEET';
export const BITTER = 'FLAVOUR/BITTER';
export const UMAMI = 'FLAVOUR/UMAMI';
export const FAT = 'FLAVOUR/FAT';
// the taste of ammonium chloride
export const SALMIAK = 'FLAVOUR/SALMIAK';
// seems like it may be disputed whether
// most humans can detect and prefer calcium
// but this is a game about smoothies so :shrug:
export const CALCIUM = 'FLAVOUR/CALCIUM';

// Somatosensory sensations
// think: chilli
export const SPICY = 'FLAVOUR/SPICY';
// think: mint, eucalyptus
export const COOL = 'FLAVOUR/COOL';
// the tactile experience of tannins in your saliva
// think: red wine, unripe banana
export const ASTRINGENT = 'FLAVOUR/ASTRINGENT';
// tastes "sour", but has additional sensations
// including olfactory and pain sensations
// think: vinegar, wine, pickles
export const ACETICACID = 'FLAVOUR/ACETICACID';
// in some wine, a deep and clear SOUR
export const TARTARICACID = 'FLAVOUR/TARTARICACID';
// think: szechuan chili
export const NUMBNESS = 'FLAVOUR/NUMBNESS';

// Smells that we confuse with taste
// ---------------------------------
export const VANILLA = 'FLAVOUR/VANILLA';
export const CINNAMON = 'FLAVOUR/CINNAMON';
export const FLORAL = 'FLAVOUR/FLORAL';
// citral and limonene make us think "sour"
export const CITRUS = 'FLAVOUR/CITRUS';
// smoky makes us think umami and bitter
export const SMOKY = 'FLAVOUR/SMOKY';
// cut grass, vegetative, pine needles,
// think: kiwifruit, jalapeno, capsicum,
// matcha, olive oil, wheat grass
export const GRASSY = 'FLAVOUR/GRASSY';
// think: root vegetables, mushrooms, soil, dried leaves
export const EARTHY = 'FLAVOUR/EARTHY';

// We include some complex ingredients as atomic flavours
// even though they aren't really so that it's easy to
// make an individual taste profile that "likes watermelon"
// even though IRL that would probably reduce to some combination
// of atomic flavours, scents and textures
//
// When these ingredients break down, they should always
// include the corresponding flavour
export const PINEAPPLE = 'FLAVOUR/PINEAPPLE';
// TODO: chocolate, coffee, durian
