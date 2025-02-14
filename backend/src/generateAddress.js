const { ethers } = require('ethers');

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

// Extract the address and private key
const address = wallet.address;
const privateKey = wallet.privateKey;

console.log(`Address: ${address}`);
console.log(`Private Key: ${privateKey}`);