const assert = require('assert');
const damlev = require('./');

describe('damlev', () => {

    describe('general cases', () => {
        /**
         * These test cases were taken from:
         * https://github.com/jamesturk/jellyfish-testdata
         */
        const tt = [
            ['', '', 0],
            ['abc', '', 3],
            ['bc', 'abc', 1],
            ['fuor', 'four', 1],
            ['abcd', 'acb', 2],
            ['cape sand recycling ', 'edith ann graham', 17],
            ['jellyifhs', 'jellyfish', 2],
            ['ifhs', 'fish', 2],
            ['Hello, world!', 'Hello,國 world!', 1],
        ];

        tt.forEach((t) => {
            it(`ranks "${t[0]}" vs "${t[1]} == ${t[2]}`, () => {
                assert.equal(damlev(t[0], t[1]), t[2]);
            });
        });
    });
});
