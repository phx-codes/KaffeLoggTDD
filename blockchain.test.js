import { describe, test, expect } from 'vitest';
import { calculateHash, mineBlock, Blockchain } from './blockchain.js';

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

  test("mineBlock ska ta block och ge tillbaks block där hashen börjar med rätt summa nollor", () => {
    
    const unminedBlock = {
      index: 2,
      timestamp: 1718294400000,
      transactions: [],
      previousHash: "00000def"
    };

    const difficulty = 1;

    const minedBlock = mineBlock(unminedBlock, difficulty);

    expect(minedBlock.hash.startsWith("0")).toBe(true);

    expect(minedBlock.nonce).toBeGreaterThan(0);
  });
});

