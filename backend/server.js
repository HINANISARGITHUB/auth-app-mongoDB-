const express = require('express')  // creates server (API)
const mongoose = require('mongoose') // connects Node.js with MongoDB
const cors = require('cors')  // allows frontend (React) to talk with backend
const app = express()   // backend server app.

// Middle ware
app.use(express.json())
app.use(cors())

// mongodb connection

mongoose.connect('mongodb://127.0.0.1:27017/authDB')
.then(()=> console.log('mongodb connected!'))
.catch((err) => console.log(err));

// schema
const userSchema = new mongoose.Schema({  // mongodb store data from schema
    name: String,
   email: { type: String, unique: true },
    password: String
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema)   // variable name , const userschema variable

// model used to interect with user data

// signup
// app.post('/signup', async(req , res) => {
// const {name, email, password} = req.body;
// const users = new User({name, email, password})
// await users.save();
// res.json({message: "User Registered"})
// })

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const cleanEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: cleanEmail });

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  try {
    const users = new User({
      name,
      email: cleanEmail,
      password
    });

    await users.save();

    res.json({ message: "User Registered" });
  } catch (err) {
    res.json({ message: "Error: email already exists" });
  }
});
// login
app.post('/login', async(req, res) => {
    const {name, email, password} = req.body;
    const users = await User.findOne({name, email, password})
    if(users) {
       res.json({message: "Login Success"})
    }
    else {
        res.json({message: "Invalid Credentials"})
    }
})

app.listen(3000, () => {
    console.log("server running on port 3000");
    
})
