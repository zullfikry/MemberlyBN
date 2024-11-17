const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
require("../routes/authRoutes");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, dateOfBirth, email, password } = req.body;

    // Validate inputs
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    // Check if email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      console.error("Error hashing password");
      return res.status(500).json({ error: "Error hashing password" });
    }

    // Create and save new user with all fields initialized
    const user = await User.create({
      name,
      dateOfBirth,
      email,
      password: hashedPassword,
      address: '',
      contactNumber: '',
      subscriptionType: '',
      profilePicture: '', 
      keyPass: '',
      keyDuration: '',
      isActive: false,
      hasFrozen: false,
      freezeDuration: 0,
      expirationDate: null,
      notifications: {
        badge: true,
        push: { expiration: false, renewal: false },
        email: { expiration: false, renewal: false },
      },
      isAdmin: false
    });

    if (!user) {
      console.error("Error creating user");
      return res.status(500).json({ error: "Error creating user" });
    }

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    // check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email,
          id: user._id,
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          address: user.address,
          contactNumber: user.contactNumber,
          subscriptionType: user.subscriptionType,
          profilePicture: user.profilePicture,
          keyPass: user.keyPass,
          keyDuration: user.keyDuration,
          isActive: user.isActive,
          hasFrozen: user.hasFrozen,
          expirationDate: user.expirationDate,
          notifications: user.notifications,
          isAdmin: user.isAdmin
         },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email, stage, password } = req.body;

    // Step 1: Verify email
    if (stage === 'verifyEmail') {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Email not found' });
      }
      return res.json({ success: true, message: 'Email verified' });
    }

    // Step 2: Reset password
    if (stage === 'resetPassword') {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Hash the new password
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) {
        return res.status(500).json({ success: false, message: 'Error hashing password' });
      }

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.json({ success: true, message: 'Password reset successfully' });
    }

    // Invalid stage
    res.status(400).json({ success: false, message: 'Invalid stage provided' });
  } catch (error) {
    console.error('Error handling forgot password:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Getprofile
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      console.log(user); 
      res.json(user);
    });
  }
};

// Logout user
const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
  res.status(200).json({ message: "Logged out successfully" });
};

// Fetch Users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find()
    if(!users || users.length == 0) {
      return res.status(404).json({ message: "No Users Found"})
    }
    return res.status(200).json(users)
  } catch (error) {
    next(error);
  }
};

// Fetch a specific user by their ID
const fetchUserById = async (req, res, next) => {
  const { userId } = req.params;
  let user;

  try {
    user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }

  res.user = user;
  next();
};

// Update the user details
const modifyUserDetails = async (req, res, next) => {
  const { userId } = req.params;
  const updatedFields = req.body;

  try {
    // Fetch the user to update
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the provided fields
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] !== undefined) {
        user[key] = updatedFields[key];
      }
    });

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Attach updated user to the response
    res.updatedUser = updatedUser;

    next(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user details" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Update Subscription 
const updateSubscription = async (req, res) => {
  try {
    const { userId, subscriptionType, duration } = req.body;

    // Calculate expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + duration);

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionType,
        expirationDate,
        isActive: true,
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update subscription" });
  }
};

// Update KeyPass and KeyDuration
const updateKeyPass = async (req, res) => {
  try {
    const { userId, keyPass, keyDuration } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        keyPass,      
        keyDuration,  
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update key pass" });
  }
};

// Update freeze status and extend duartion
const updateFreezeStatus = async (req, res) => {
  try {
    const { userId, expirationDate, hasFrozen, freezeDuration } = req.body;

    // Find and update the user with the new freeze status and duration
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        expirationDate,
        hasFrozen,
        freezeDuration, 
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update freeze status" });
  }
};

// Update notification
const updateNotifications = async (req, res) => {
  try {
    const { userId, notificationType, notificationKey, value } = req.body;

    // Construct the path to update the specific notification
    const update = { [`notifications.${notificationType}.${notificationKey}`]: value };
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update notifications" });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, address, contactNumber } = req.body; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, address, contactNumber }, 
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateSubscription,
  updateKeyPass,
  updateFreezeStatus,
  updateNotifications,
  updateProfile,
  forgotPassword,
  fetchUsers,
  fetchUserById,
  modifyUserDetails,
  deleteUser
};
