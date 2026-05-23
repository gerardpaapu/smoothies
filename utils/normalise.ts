const hasOwn = Object.prototype.hasOwnProperty;

// normalise a vector to unit length
export default function normalise(vec: Record<string, number>, scale = 1) {
  let length2 = 0;
  for (let k in vec) {
    if (hasOwn.call(vec, k)) {
      length2 += vec[k] ** 2;
    }
  }

  const length = Math.sqrt(length2) / scale;
  const result = Object.create(null) as Record<string, number>;
  for (let k in vec) {
    if (hasOwn.call(vec, k)) {
      result[k] = vec[k] / length;
    }
  }

  return result;
}
