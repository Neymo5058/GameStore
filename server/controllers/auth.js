import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered." });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      role: 'client'
    });

    res.status(201).json({
      message: "User registered!",
      user: { email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      message: "Login successful",
      user: { email: user.email, role: user.role, id: user._id }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

export function me(req, res) {
  res.json({ user: req.user });
}

// DEV endpoint for quick admin/manager creation
export async function devCreateUser(req, res) {
  const { email, password, role = "client" } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });
  if (!["admin", "manager", "client"].includes(role))
    return res.status(400).json({ message: "Role invalid." });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Already exists." });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role });
  res.status(201).json({ email: user.email, role: user.role });
}