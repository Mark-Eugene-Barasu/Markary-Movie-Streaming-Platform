const mongoose = require('mongoose');
const Content = require('../models/Content');

// GET /api/content/featured
exports.getFeatured = async (_req, res) => {
  try {
    const featured = await Content.findOne({ featured: true }).lean();
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/content/trending
exports.getTrending = async (_req, res) => {
  try {
    const items = await Content.find({ trending: true }).limit(12).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/content/all?genre=Sci-Fi&type=series&page=1
exports.getAll = async (req, res) => {
  try {
    const { genre, type, page = 1, limit = 20 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ error: 'Invalid page or limit parameters' });
    }
    const filter = {};
    if (genre) filter.genres = genre;
    if (type)  filter.type  = type;

    const skip  = (pageNum - 1) * limitNum;
    const total = await Content.countDocuments(filter);
    const items = await Content.find(filter).skip(skip).limit(limitNum).lean();

    res.json({ total, page: pageNum, pages: Math.ceil(total / limitNum), items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/content/search?q=dark
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query param "q" is required.' });
    const items = await Content.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/content/:id
exports.getOne = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid content ID.' });
    }
    const item = await Content.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Content not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
