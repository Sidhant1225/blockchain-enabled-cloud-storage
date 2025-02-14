const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const Web3 = require('web3');
const crypto = require('crypto');
const { ethers } = require('ethers'); // Ensure this is correctly imported
const { authenticate, verifyToken } = require('./auth');
const { checkPermission } = require('./accessControl');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

// AWS S3 setup
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Web3 setup
const infuraUrl = process.env.INFURA_URL;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Contract ABIs and addresses
const fileStorageABI = require('./contracts/FileStorage.json').abi;
const userManagerABI = require('./contracts/UserManager.json').abi;

const fileStorageAddress = '0xaCF3366F84F77AA9Da462a851fFf6599470C781f';
const userManagerAddress = '0xd71687Bdccc2b343a655584da1499B7178C8aE37';
const fileStorage = new web3.eth.Contract(fileStorageABI, web3.utils.toChecksumAddress(fileStorageAddress));
const userManager = new web3.eth.Contract(userManagerABI, web3.utils.toChecksumAddress(userManagerAddress));

// Function to hash a file using SHA-256
function hashFile(buffer) {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(buffer);
    return hashSum.digest('hex');
}

// Function to validate Ethereum address using ethers.js
function validateEthereumAddress(address) {
    try {
        const isValid = ethers.utils.isAddress(address);
        console.log(`Is valid Ethereum address: ${isValid}`);
        return isValid;
    } catch (error) {
        console.error('Error validating address:', error.message);
        return false;
    }
}

// Authentication endpoint
app.post('/login', authenticate);

// Register user endpoint
app.post('/register', verifyToken, checkPermission('write', 'any_data'), async (req, res) => {
    const { userAddress } = req.body;
    console.log('Received user address:', userAddress);

    if (!userAddress) {
        return res.status(400).send('User address is required');
    }

    try {
        // Validate Ethereum address
        const isValidAddress = validateEthereumAddress(userAddress);
        console.log('Is valid Ethereum address:', isValidAddress);
        if (!isValidAddress) {
            throw new Error('Invalid Ethereum address');
        }

        // Get the first account from the provider
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
        if (accounts.length === 0) {
            throw new Error('No accounts available from the provider');
        }

        const fromAddress = accounts[0];
        const result = await userManager.methods.registerUser(userAddress).send({ from: fromAddress });
        console.log('Register result:', result);
        res.send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send(`Error registering user: ${error.message}`);
    }
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Internal Server Error');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});