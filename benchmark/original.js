// from http://www.davidhampgonsalves.com/Damerau-Levenshtein
function damerauLevenshteinDistance(source, target) {
  if (!source || source.length === 0)
    if (!target || target.length === 0)
      return 0;
    else
      return target.length;
  else if (!target)
    return source.length;

  var sourceLength = source.length;
  var targetLength = target.length;
  var score = [];

  var INF = sourceLength + targetLength;
  score[0] = [INF];
  for (var i=0 ; i <= sourceLength ; i++) { score[i + 1] = []; score[i + 1][1] = i; score[i + 1][0] = INF; }
  for (var i=0 ; i <= targetLength ; i++) { score[1][i + 1] = i; score[0][i + 1] = INF; }

  var sd = {};
  var combinedStrings = source + target;
  var combinedStringsLength = combinedStrings.length;
  for(var i=0 ; i < combinedStringsLength ; i++) {
    var letter = combinedStrings[i];
    if (!sd.hasOwnProperty(letter))
      sd[letter] = 0;
  }

  for (var i=1 ; i <= sourceLength ; i++) {
    var DB = 0;
    for (var j=1 ; j <= targetLength ; j++) {
      var i1 = sd[target[j - 1]];
      var j1 = DB;

      if (source[i - 1] == target[j - 1]) {
        score[i + 1][j + 1] = score[i][j];
        DB = j;
      }
      else
        score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;

      score[i + 1][j + 1] = Math.min(score[i + 1][j + 1], score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1));
    }
    sd[source[i - 1]] = i;
  }
  return score[sourceLength + 1][targetLength + 1];
}

module.exports = damerauLevenshteinDistance;
