module.exports = function damlev (source, target, options) {
  // If one of the strings is blank, returns the length of the other (the
  // cost of the n insertions)
  if (!source) {
    return target.length;
  } else if (!target){
    return source.length;
  }

  var sourceLength = source.length;
  var targetLength = target.length;
  var i;

  // Initialize a char code cache array
  var sourceCodes = new Array(sourceLength);
  var targetCodes = new Array(targetLength);
  for (i = 0; i < sourceLength; i++) { sourceCodes[i] = source.charCodeAt(i); }
  for (i = 0; i < targetLength; i++) { targetCodes[i] = target.charCodeAt(i); }

  // Initialize the scoring matrix
  var INF = sourceLength + targetLength;
  var rowSize = sourceLength + 1;
  var score = new Array((sourceLength + 1) * (targetLength + 1));
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
  var chars = {};
  var j, DB, i1, j2, newScore;
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
};
