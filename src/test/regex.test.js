import { wordParser } from '../regex';
import * as assert from 'assert';

function regexTest() {
  console.log('==========REGEX TEST START==========');
  try {
    assert.equal(wordParser("Helo, it's me Ive been"), 6);
    assert.equal(
      wordParser('问题来了，博来博去博不出3个1🙈'),
      14
    );
    console.log('success');
    console.log(
      wordParser('既然已来到Perth了。 Hahaha world')
    );
    console.log(
      wordParser(`
第一次没有和家人庆祝华人新年。既然已来到Perth了，那就去我爸的朋友家庆祝！
顺便试一下我的新的Go Pro 😁
高清版本的在[YouTube](https://youtu.be/i16RjWX9QY0)
        `)
    );
  } catch (e) {
    console.log(e);
  }
  console.log('========== REGEX TEST END ==========');
}
export default regexTest;
