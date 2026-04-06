const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
    description: { type: String, required: true, minlength: 10, maxlength: 1000 },
    type:        { type: String, enum: ['movie', 'series'], required: true },
    genres:      [{ type: String }],
    releaseYear: { type: Number },
    rating:      { type: String, default: 'PG-13' },  // e.g. PG, 16+, R
    matchScore:  { type: Number, min: 0, max: 100, default: 80 },
    poster:      { 
      type: String, 
      default: '', 
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: 'Poster must be a valid HTTP(S) URL'
      }
    },   // URL
    backdrop:    { 
      type: String, 
      default: '', 
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: 'Backdrop must be a valid HTTP(S) URL'
      }
    },   // URL
    trailer:     { 
      type: String, 
      default: '', 
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: 'Trailer must be a valid HTTP(S) URL'
      }
    },   // URL
    videoUrl:    { 
      type: String, 
      default: '', 
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: 'Video URL must be a valid HTTP(S) URL'
      }
    },   // URL (production: CDN link)
    seasons:     { type: Number, default: 1 },    // for series
    duration:    { type: Number, default: 90 },   // minutes (for movies)
    cast:        [{ type: String }],
    director:    { type: String, default: '' },
    tag:         { type: String, enum: ['New', 'Hot', 'Top 10', ''], default: '' },
    featured:    { type: Boolean, default: false },
    trending:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search
contentSchema.index({ title: 'text', description: 'text', genres: 'text' });

module.exports = mongoose.model('Content', contentSchema);
