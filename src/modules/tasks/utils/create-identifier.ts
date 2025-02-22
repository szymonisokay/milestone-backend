export const createIdentifier = (
  count: number,
  projectSymbol: string,
): string => `${projectSymbol}-${(count + 1).toString().padStart(2, '0')}`;
