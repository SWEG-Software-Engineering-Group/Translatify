export default function replaceSpacesWithComboSymbol(str: string): string {
    return str.replaceAll(/\s+/g, '_-~');
  }
  