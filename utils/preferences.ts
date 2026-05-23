import normalise from './normalise';

// Folk like some traits of a smoothie and don't like others
type Traits = Record<string, number>;
type HATE = -1;
type LOVE = 1;
type Attitude = HATE | LOVE;
export const HATE: HATE = -1;
export const LOVE: LOVE = 1;

// one type of experience that a folk holds some attitude
// toward with some certainty
type Preference = {
  traits: Traits;
  attitude: Attitude;
  certainty: number;
};

export const love = (traits: Traits, scale = 1): Preference => ({
  attitude: LOVE,
  traits: normalise(traits, scale),
  certainty: 1, // TODO: not sure what I'm doing with this
});

export const hate = (traits: Traits, scale = 1): Preference => ({
  attitude: HATE,
  traits: normalise(traits, scale),
  certainty: 1, // TODO: no idea
});

export type Experience = { name: string; traits: Traits };

// an experience matches a preference, if the experience
// includes all the named traits and to the degree
// of the preference projected onto the experience

const hasOwn = Object.prototype.hasOwnProperty;

const match = (
  preference: Preference,
  experience: Experience,
): number | false => {
  // does the experience match the traits
  let dotProduct = 0;
  let t = 0;
  const pref = preference.traits;
  const exp = experience.traits;

  for (const k in pref) {
    if (hasOwn.call(pref, k)) {
      if (hasOwn.call(exp, k)) {
        dotProduct += pref[k] * exp[k];
        t += exp[k] * exp[k];
      } else {
        return false;
      }
    }
  }

  return dotProduct / Math.sqrt(t);
};

export type Taster = Array<Preference>;

export const getMatches = (taster: Taster, experience: Experience) => {
  return taster.map((pref) => {
    const m = match(pref, experience);
    return m && m * pref.attitude;
  });
};

export function getReview(taster: Taster, experience: Experience): number {
  const matches = getMatches(taster, experience).filter((_) => _ !== false);

  // if any are strongly negative, then return the sum of all negatives
  const anyStrongNegatives = matches.some((i) => i < -1);
  if (anyStrongNegatives) {
    return matches.filter((_) => _ < 0).reduce((a, b) => a + b, 0);
  }

  // otherwise just return the sum of all matches
  return matches.reduce((a, b) => a + b, 0);
}
