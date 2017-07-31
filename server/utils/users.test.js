const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'react'
    },
    {
      id: '2',
      name: 'test',
      room: 'course'
    },
    {
      id: '3',
      name: 'woop',
      room: 'react'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'reid',
      room: 'tacos'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it('should return names for node course', () => {
    var userList = users.getUserList('react');
    expect(userList).toEqual(['Mike', 'woop']);
  });
  it('should remove a user', () => {
    var userRemoved = users.removeUser('3');
    expect(userRemoved[0]).toEqual(users.users[2]);
  });
  it('should not remove a user', () => {
    // pass in something that will not change array
    var userRemoved = users.removeUser('4');
    expect(userRemoved).toEqual([]);
  })
  it('should find user', () => {
    var user = users.getUser('1');
    expect(user[0].id).toBe('1');
  })
  it('should not find user', () => {
    var user = users.getUser('4');
    expect(user).toEqual([]);
  })
})
