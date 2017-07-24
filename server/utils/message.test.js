var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct lcoation object', () => {
    var from = 'Reid';
    var latitude =55;
    var longitude = 54;
    var message = generateLocationMessage(from, latitude, longitude);
      expect(message.from).toBe('Reid')
      expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`)
      expect(message.createdAt).toBeA('number')
  });
});
