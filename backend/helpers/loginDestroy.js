
const loginDestroy = (user) => ({
    ok: true,
    user: {
        id: user._id,
        city: user.city,
        name: user.name,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
    },
    expires: Date.now() + 30*86400e3
});

module.exports = loginDestroy;