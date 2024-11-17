const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    default: ''
  },
  subscriptionType: {
    type: String,
    default: ''
  },
  profilePicture: { 
    type: String, 
    default: ''  
  },
  keyPass: {
    type: String,
    default: ''
  },
  keyDuration: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  hasFrozen: {
    type: Boolean,
    default: false
  },
  expirationDate: {
    type: Date,
    default: null
  },
  freezeDuration: {
    type: Number,  
    default: 0,    
  },
  notifications: {
    badge: {
      type: Boolean,
      default: true
    },
    push: {
      expiration: {
        type: Boolean,
        default: false
      },
      renewal: {
        type: Boolean,
        default: false
      }
    },
    email: {
      expiration: {
        type: Boolean,
        default: false
      },
      renewal: {
        type: Boolean,
        default: false
      }
    }
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
}, {
  timestamps: true 
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
