import crypto from "crypto";

export function calculateHash(block) {
    const blockString =
    block.index +
    block.previousHash +
    JSON.stringify(block.transactions) +
    block.nonce;

    return crypto
    .createHash("sha256")
    .update(blockString)
    .digest("hex");
}

export function mineBlock(block, difficulty) {
    const minedBlock = { ...block };
    minedBlock.nonce = 0;

    const targetZeros = "0".repeat(difficulty);

    minedBlock.hash = calculateHash(minedBlock);

    while (!minedBlock.hash.startsWith(targetZeros)) {
        minedBlock.nonce++;
        minedBlock.hash = calculateHash(minedBlock);
    }

    return minedBlock;
}