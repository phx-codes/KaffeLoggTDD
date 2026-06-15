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