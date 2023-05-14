import User from './User';

describe('User Type', () => {
  it('should require a username property of type string', () => {
      const user: User = {
          password: 'password', email: 'example@example.com', group: 'users', name: 'John', surname: 'Doe',
          username: ''
      };
      expect(user).toBeDefined();
  });

  it('should require a password property of type string', () => {
      const user: User = {
          username: 'johndoe', email: 'example@example.com', group: 'users', name: 'John', surname: 'Doe',
          password: ''
      };
      expect(user).toBeDefined();
  });

  it('should require an email property of type string', () => {
      const user: User = {
          username: 'johndoe', password: 'password', group: 'users', name: 'John', surname: 'Doe',
          email: ''
      };
      expect(user).toBeDefined();
  });
});