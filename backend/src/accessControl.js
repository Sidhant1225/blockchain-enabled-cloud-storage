// Define roles and their permissions
const roles = {
    admin: ['read:any_data', 'write:any_data', 'share:any_data'],
    user: ['read:own_data', 'share:own_data'],
};

// Middleware to check permissions
function checkPermission(action, resource) {
    return (req, res, next) => {
        const rolePermissions = roles[req.userRole] || [];
        const permission = `${action}:${resource}`;
        if (rolePermissions.includes(permission)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
}

module.exports = { checkPermission };