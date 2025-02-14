const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';

// Mock user data (in real applications, use a database)
const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
    { id: 2, username: 'user', password: bcrypt.hashSync('userpass', 8), role: 'user' },
];

// Authenticate user and generate JWT
function authenticate(req, res) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
}

// Middleware to verify the token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(403).send('No token provided');
    }

    console.log(`Token received: ${token}`);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).send('Failed to authenticate token');
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

module.exports = { authenticate, verifyToken };