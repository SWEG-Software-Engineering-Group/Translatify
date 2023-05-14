import TextState from './TextState';

describe('TextState Type', () => {
  it('should have the correct values', () => {
    expect(TextState.originalText).toBe(0);
    expect(TextState.toBeTranslated).toBe(1);
    expect(TextState.toBeVerified).toBe(2);
    expect(TextState.verified).toBe(3);
    expect(TextState.rejected).toBe(4);
  });

  it('should have string values', () => {
    expect(typeof TextState.originalText).toBe('number');
    expect(typeof TextState.toBeTranslated).toBe('number');
    expect(typeof TextState.toBeVerified).toBe('number');
    expect(typeof TextState.verified).toBe('number');
    expect(typeof TextState.rejected).toBe('number');
  });
});