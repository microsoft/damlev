const libs = {
    'WatchBeam/damlev': require('../'),
    'lzrski/damerau-levenshtein': require('damerau-levenshtein'),
    'StefanHamminga/damerau-levenshtein-git': require('damerau-levenshtein-git'),
    'davidhampgonsalves': require('./original'),
};

suite('head-to-head', () => {
    set('mintime', 5000)

    Object.keys(libs).forEach((name) => {
        const fn = libs[name];
        bench(name, () => {
            // from https://github.com/sindresorhus/leven/blob/master/bench.js
            fn('a', 'b');
            fn('ab', 'ac');
            fn('ac', 'bc');
            fn('abc', 'axc');
            fn('kitten', 'sitting');
            fn('xabxcdxxefxgx', '1ab2cd34ef5g6');
            fn('cat', 'cow');
            fn('xabxcdxxefxgx', 'abcdefg');
            fn('javawasneat', 'scalaisgreat');
            fn('example', 'samples');
            fn('sturgeon', 'urgently');
            fn('levenshtein', 'frankenstein');
            fn('distance', 'difference');
            fn('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
        });
    });
});
