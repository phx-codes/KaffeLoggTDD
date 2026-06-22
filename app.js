import express from 'express';
import { Blockchain, mineBlock } from './blockchain.js';

const app = express();
app.use(express.json());


const bitcoin = new Blockchain();


app.get('/blockchain', (req, res) => {
  res.json(bitcoin);
});


app.post('/transactions', (req, res) => {
  const { sender, recipient, batchId, weightKg } = req.body;

  
  if (!sender || !recipient || !batchId || !weightKg) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const tx = { sender, recipient, batchId, weightKg };
  bitcoin.addTransaction(tx);

  res.status(201).json({ message: 'Transaction added successfully', transaction: tx });
});


app.post('/mine', (req, res) => {

  if (bitcoin.pendingTransactions.length === 0) {
    return res.status(400).json({ error: 'No pending transactions to mine' });
  }


  const difficulty = process.env.NODE_ENV === 'test' ? 1 : 3;


  const previousBlock = bitcoin.chain[bitcoin.chain.length - 1];
  

  const newBlockData = {
    index: bitcoin.chain.length,
    timestamp: Date.now(),
    transactions: bitcoin.pendingTransactions,
    previousHash: previousBlock.hash
  };

  const minedBlock = mineBlock(newBlockData, difficulty);

  bitcoin.chain.push(minedBlock);
  bitcoin.pendingTransactions = [];

  res.json({ message: 'Block successfully mined!', block: minedBlock });
});

export default app;