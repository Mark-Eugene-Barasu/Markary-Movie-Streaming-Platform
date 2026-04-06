const mongoose = require('mongoose');
const User    = require('../models/User');
const Content = require('../models/Content');

// GET /api/user/mylist
exports.getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('myList').lean();
    res.json(user.myList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/user/mylist/:contentId
exports.addToMyList = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contentId)) {
      return res.status(400).json({ error: 'Invalid content ID.' });
    }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { myList: req.params.contentId } },
      { new: true }
    );
    if (!result) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'Added to My List.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/user/mylist/:contentId
exports.removeFromMyList = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contentId)) {
      return res.status(400).json({ error: 'Invalid content ID.' });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { myList: req.params.contentId },
    });
    res.json({ message: 'Removed from My List.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/user/history
exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('watchHistory.content')
      .lean();
    res.json(user.watchHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/user/history/:contentId
exports.updateProgress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contentId)) {
      return res.status(400).json({ error: 'Invalid content ID.' });
    }
    const { progress } = req.body;
    if (typeof progress !== 'number' || progress < 0 || progress > 100000) { // reasonable max
      return res.status(400).json({ error: 'Invalid progress value.' });
    }
    const user = await User.findById(req.user._id);
    const entry = user.watchHistory.find(
      (h) => h.content.toString() === req.params.contentId
    );
    if (entry) {
      entry.progress  = progress;
      entry.updatedAt = new Date();
    } else {
      user.watchHistory.push({ content: req.params.contentId, progress });
    }
    await user.save();
    res.json({ message: 'Progress updated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
