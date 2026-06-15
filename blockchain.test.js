import { describe, test, expect } from 'vitest';
import { calculateHash } from './blockchain.js';

describe('Blockchain enhetstester', () => {

  test('calculateHash ska generera en SHA-256 hash baserat på blockets innehåll', () => {

    const dummyBlock = {
      index: 1,
      timestamp: 1718294400000,
      transactions: [],
      previousHash: '00000abc',
      nonce: 0
    };

    const result = calculateHash(dummyBlock);

    expect(typeof result).toBe('string');
    expect(result.length).toBe(64); 
  });
});