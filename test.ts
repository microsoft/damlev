import { randomBytes } from 'crypto'
import * as assert from 'assert';
import damlev from './';

describe('damlev', () => {
    /**
     * These test cases were taken from:
     * https://github.com/jamesturk/jellyfish-testdata
     */
    const tt: [string, string, number][] = [
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

    describe('general cases', () => {

        tt.forEach((t) => {
            it(`ranks "${t[0]}" vs "${t[1]} == ${t[2]}`, () => {
                assert.equal(damlev(t[0], t[1]), t[2]);
            });
        });
    });

    it('maintains correctness after fuzzing input', () => {
        const str = () => randomBytes(Math.floor(Math.random() * 12)).toString('hex');
        for (let i = 0; i < 10000; i++) {
            damlev(str(), str());
            for (let k = 0; k < tt.length; k++) {
                assert.equal(damlev(tt[k][0], tt[k][1]), tt[k][2]);
            }
        }
    });
});
