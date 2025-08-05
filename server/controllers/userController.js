import User from '../models/User.js';

export async function getAllUsers(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [users, totalItems] = await Promise.all([
      User.find({}, '-password').skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.json({
      users,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        page,
        limit,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['admin', 'manager', 'client'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      message: 'Role updated',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

