const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateSubscription, updateKeyPass, updateFreezeStatus, updateNotifications, updateProfile, forgotPassword, fetchUsers, fetchUserById, logoutUser, modifyUserDetails, deleteUser } = require('../controllers/authController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser)
router.post('/forgot-password', forgotPassword);
router.post('/update-subscription', updateSubscription);
router.post('/update-key-pass', updateKeyPass);
router.post('/update-freeze-status', updateFreezeStatus);
router.patch("/update-notifications", updateNotifications);
router.post('/update-profile', updateProfile);
router.get("/admin/users", fetchUsers);
router.get('/admin/users/:userId', fetchUserById, (req, res) => {
  res.json(res.user);
});
router.patch('/admin/users/:userId', modifyUserDetails, (req, res) => {
  res.json(res.user)
});
router.delete('/admin/users/:userId', deleteUser);

module.exports = router;