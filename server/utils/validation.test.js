const expect = require('expect');
const {isRealString} = require('./validation');

describe('Join', () => {
  it('should reject non-string values', () => {

    var message = isRealString(33);
    expect(message).toBe(false);
  });
  it('should reject strings with only spaces', () => {
    var message = isRealString('      ');
    expect(message).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var message = isRealString('   easasdf*ds');
    expect(message).toBe(true);
  });
});
