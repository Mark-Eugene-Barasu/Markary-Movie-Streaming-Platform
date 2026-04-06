require('dotenv').config();
const mongoose = require('mongoose');
const Content  = require('./models/Content');
const User     = require('./models/User');

const contents = [
  {
    title: 'Dark Horizon',
    description: 'A rogue scientist discovers a signal from beyond the known universe — and the race to decode it changes everything humanity thought it knew about existence.',
    type: 'series', genres: ['Sci-Fi','Thriller'], releaseYear: 2024,
    rating: '16+', matchScore: 97, seasons: 2, tag: 'Top 10', featured: true, trending: true,
  },
  {
    title: 'Void Signal',
    description: 'Deep in the ocean, a research team picks up an unexplained frequency that leads them to an ancient civilisation.',
    type: 'series', genres: ['Sci-Fi','Drama'], releaseYear: 2023,
    rating: 'PG-13', matchScore: 92, seasons: 1, tag: 'New', trending: true,
  },
  {
    title: 'Neon Cage',
    description: 'A cyberpunk thriller set in 2087 where a hacker uncovers a government plot to control the minds of millions.',
    type: 'series', genres: ['Action','Sci-Fi'], releaseYear: 2024,
    rating: '18+', matchScore: 88, seasons: 3, tag: 'Hot', trending: true,
  },
  {
    title: 'The Last Epoch',
    description: 'When time itself begins to fracture, a small team of scientists must travel back to prevent the collapse of civilisation.',
    type: 'movie', genres: ['Sci-Fi','Thriller'], releaseYear: 2023,
    rating: 'PG-13', matchScore: 85, duration: 132, tag: '', trending: true,
  },
  {
    title: 'Fractured',
    description: 'A psychological horror series following a family that moves into a house haunted by memories of its former occupants.',
    type: 'series', genres: ['Horror','Drama'], releaseYear: 2024,
    rating: '18+', matchScore: 91, seasons: 3, tag: 'Hot', trending: true,
  },
  {
    title: 'Echo Protocol',
    description: 'A former intelligence operative is forced out of retirement when a ghost from her past resurfaces with world-ending plans.',
    type: 'series', genres: ['Action','Thriller'], releaseYear: 2024,
    rating: '16+', matchScore: 89, seasons: 1, tag: 'New', trending: true,
  },
  {
    title: 'Solaris Deep',
    description: 'An astronaut adrift in deep space must rely on a mysterious AI companion to find her way back to Earth.',
    type: 'movie', genres: ['Sci-Fi','Drama'], releaseYear: 2023,
    rating: 'PG-13', matchScore: 94, duration: 118, tag: '', trending: false,
  },
  {
    title: 'Blood Meridian',
    description: 'A gritty crime drama set in 1970s Los Angeles, following a detective who descends into the city\'s criminal underworld.',
    type: 'series', genres: ['Drama','Thriller'], releaseYear: 2022,
    rating: '18+', matchScore: 96, seasons: 4, tag: 'Hot', trending: true,
  },
  {
    title: 'Phantom City',
    description: 'A supernatural mystery unfolds when a journalist investigates the disappearance of an entire town overnight.',
    type: 'series', genres: ['Horror','Mystery'], releaseYear: 2024,
    rating: '16+', matchScore: 87, seasons: 2, tag: 'New', trending: false,
  },
  {
    title: 'Zero Hour',
    description: 'With 60 minutes before a nuclear catastrophe, a lone technician races against time in an abandoned facility.',
    type: 'movie', genres: ['Action','Thriller'], releaseYear: 2024,
    rating: '16+', matchScore: 90, duration: 98, tag: '', trending: false,
  },
  {
    title: 'The Fold',
    description: 'A theoretical physicist discovers a way to fold space — but each use erases a memory she cannot get back.',
    type: 'movie', genres: ['Sci-Fi','Drama'], releaseYear: 2023,
    rating: 'PG-13', matchScore: 93, duration: 112, tag: 'Top 10', trending: false,
  },
  {
    title: 'Echoes of Tomorrow',
    description: 'A landmark Markary Original. Ten strangers wake up in a world where the past and future have merged into one terrifying present.',
    type: 'series', genres: ['Sci-Fi','Drama','Thriller'], releaseYear: 2024,
    rating: '16+', matchScore: 98, seasons: 1, tag: 'New', trending: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  MongoDB connected');

    await Content.deleteMany({});
    const inserted = await Content.insertMany(contents);
    console.log(`✅  Seeded ${inserted.length} content items`);

    // Create a demo user
    await User.deleteMany({ email: 'demo@markary.com' });
    await User.create({ name: 'Demo User', email: 'demo@markary.com', password: 'demo1234' });
    console.log('✅  Demo user created — email: demo@markary.com');

    process.exit(0);
  } catch (err) {
    console.error('❌  Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();

seed();
