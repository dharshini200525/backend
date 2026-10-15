
import userModel from '../Models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await userModel.findOne({
      email: normalizedEmail
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'staff'
    })

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await userModel.findOne({
      email: normalizedEmail
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT configuration is missing'
      })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
