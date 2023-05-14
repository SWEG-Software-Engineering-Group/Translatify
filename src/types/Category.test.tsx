import Category from './Category';

describe('Category Type', () => {
  it('should have an id property of type string', () => {
    const category: Category = { id: '1', name: 'Example Category' };
    expect(typeof category.id).toBe('string');
  });

  it('should have a name property of type string', () => {
    const category: Category = { id: '1', name: 'Example Category' };
    expect(typeof category.name).toBe('string');
  });
});