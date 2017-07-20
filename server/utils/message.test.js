var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from= 'Reid';
    var text = 'hi';
    var message = generateMessage(from,text);
    expect(message.from).toBe('Reid')
    expect(message.text).toBe('hi')
    expect(message.createdAt).toBeA('number')
  });
});
