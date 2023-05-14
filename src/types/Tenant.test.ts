import Tenant from './Tenant';

describe('Tenant Type', () => {
    it('should have a users property of type string[]', () => {
        const tenant: Tenant = { tenantName: 'Example Tenant', admins: [], users: ['user1', 'user2'], categories: [], creationDate: Date.now(), languages: [], defaultLanguage: '' };
        expect(Array.isArray(tenant.users)).toBe(true);
        expect(typeof tenant.users[0]).toBe('string');
    });

  it('should have an optional id property of type string', () => {
    const tenant: Tenant = { id: '1', tenantName: 'Example Tenant', admins: [], users: [], categories: [], creationDate: Date.now(), languages: [], defaultLanguage: '' };
    expect(typeof tenant.id).toBe('string');
  });

  it('should have an admins property of type string[]', () => {
    const tenant: Tenant = { tenantName: 'Example Tenant', admins: ['admin1', 'admin2'], users: [], categories: [], creationDate: Date.now(), languages: [], defaultLanguage: '' };
    expect(Array.isArray(tenant.admins)).toBe(true);
    expect(typeof tenant.admins[0]).toBe('string');
  });
});