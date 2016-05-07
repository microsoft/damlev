# damlev [![Build Status](https://travis-ci.org/WatchBeam/damlev.svg?branch=master)](https://travis-ci.org/WatchBeam/damlev)

This is the fastest implementation of Damerau-Levenshtein for JavaScript, an optimization of [David Hamp-Gonsalves' port](http://www.davidhampgonsalves.com/Damerau-Levenshtein).

### Usage

```js
var damlev = require('damlev');

damlev('javascript', 'yavascritp'); // => 2
```

### Benchmarks

```
 $ npm run bench

          17,483 op/s » WatchBeam/damlev
           3,749 op/s » lzrski/damerau-levenshtein
           5,731 op/s » StefanHamminga/damerau-levenshtein-git
           2,686 op/s » davidhampgonsalves

  Suites:  1
  Benches: 4
  Elapsed: 55,147.08 ms
```
