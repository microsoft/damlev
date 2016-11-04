// Cache the codes and score arrays to significantly speed up damlev calls:
// there's no need to re-allocate them.
let sourceCodes: number[];
let targetCodes: number[];
let score: number[];

/**
 * Clears the cached arrays, freeing memory that would otherwise be kept
 * forever.
 */
export function uncache() {
  sourceCodes = new Array(32);
  targetCodes = new Array(32);
  score = new Array(33 * 33);
}

uncache();

/**
 * growArray will return an array that's at least as large as the provided
 * size. It may or may not return the same array that was passed in.
 * @param  {Array} arr
 * @param  {Number} size
 * @return {Array}
 */
function growArray(arr: number[], size: number) {
  if (size <= arr.length) {
    return arr;
  }

  var target = arr.length;
  while (target < size) {
    target *= 2;
  }

  return new Array(target);
}

/**
 * Returns the edit distance between the source and target strings.
 * @param  {String} source
 * @param  {Strign} target
 * @return {Number}
 */
export default function damlev (source: string, target: string) {
  // If one of the strings is blank, returns the length of the other (the
  // cost of the n insertions)
  if (!source) {
    return target.length;
  } else if (!target){
    return source.length;
  }

  const sourceLength = source.length;
  const targetLength = target.length;
  let i: number;

  // Initialize a char code cache array
  sourceCodes = growArray(sourceCodes, sourceLength);
  targetCodes = growArray(targetCodes, targetLength);
  for (i = 0; i < sourceLength; i++) { sourceCodes[i] = source.charCodeAt(i); }
  for (i = 0; i < targetLength; i++) { targetCodes[i] = target.charCodeAt(i); }

  // Initialize the scoring matrix
  const INF = sourceLength + targetLength;
  const rowSize = sourceLength + 1;
  score = growArray(score, (sourceLength + 1) * (targetLength + 1));
  score[0] = INF;

  for (i = 0; i <= sourceLength; i++) {
    score[(i + 1) * rowSize + 0] = INF;
    score[(i + 1) * rowSize + 1] = i;
  }

  for (i = 0; i <= targetLength; i++) {
    score[0 * rowSize + i + 0] = INF;
    score[1 * rowSize + i + 1] = i;
  }

  // Run the damlev algorithm
  let chars: { [key: string]: number } = {};
  let j: number, DB: number, i1: number, j1: number, j2: number, newScore: number;
  for (i = 1; i <= sourceLength; i++) {
    DB = 0;
    for (j = 1; j <= targetLength; j++) {
      i1 = chars[targetCodes[j - 1]] || 0;
      j1 = DB;

      if (sourceCodes[i - 1] == targetCodes[j - 1]) {
        newScore = score[i * rowSize + j];
        DB = j;
      } else {
        newScore = Math.min(score[i * rowSize + j], Math.min(score[(i + 1) * rowSize + j], score[i * rowSize + j + 1])) + 1;
      }

      score[(i + 1) * rowSize + j + 1] = Math.min(newScore, score[i1 * rowSize + j1] + (i - i1 - 1) + 1 + (j - j1 - 1));
    }
    chars[sourceCodes[i - 1]] = i;
  }
  return score[(sourceLength + 1) * rowSize + targetLength + 1];
}
