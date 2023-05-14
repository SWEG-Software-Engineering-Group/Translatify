import Text from './Text';
import Category from './Category';
import TextState from './TextState';

describe('Text Type', () => {
  it('should require an idTenant property of type string', () => {
      const text: Text = {
          language: 'en', category: { id: '1', name: 'Example Category' }, title: 'Example Title', text: 'Example Text', state: TextState.toBeTranslated,
          idTenant: ''
      };
      expect(text).toBeDefined();
      expect(text.idTenant).toBe('');
  });

  it('should require a language property of type string', () => {
      const text: Text = {
          idTenant: '1', category: { id: '1', name: 'Example Category' }, title: 'Example Title', text: 'Example Text', state: TextState.toBeTranslated,
          language: ''
      };
      expect(text).toBeDefined();
      expect(text.language).toBe('');
  });

  it('should require a category property of type Category', () => {
      const text: Text = {
          idTenant: '1', language: 'en', title: 'Example Title', text: 'Example Text', state: TextState.toBeTranslated,
          category: { id: '', name: '' } as Category
      };
      expect(text).toBeDefined();
      expect(text.category.id).toBe('');
      expect(text.category.name).toBe('');
  });

  it('should require a title property of type string', () => {
      const text: Text = {
          idTenant: '1', language: 'en', category: { id: '1', name: 'Example Category' }, text: 'Example Text', state: TextState.toBeTranslated,
          title: ''
      };
      expect(text).toBeDefined();
      expect(text.title).toBe('');
  });
});