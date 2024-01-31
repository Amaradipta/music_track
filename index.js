const express = require('express');
const sequelize = require('./sequelize');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Song = require('./models/Song');
const Artist = require('./models/Artist');
const Genre = require('./models/Genre');
const verifyToken = require('./tokenVerification');

const app = express();
app.use(express.json());
const port = 3002;

const secretKey = 'skadoosh';
const payload = { userId: 14, username: 'Ditto' };
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);

// Middleware function to authenticate JWT
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing or Invalid Token' });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  console.log('Received Token:', token);

  jwt.verify(token, 'skadoosh', (err, user) => {
    if (err) {
      console.error('Token Verification Error:', err);
      return res.status(403).json({ error: 'Forbidden - Invalid Token' });
    }

    req.user = user;
    next();
  });
};


// Apply middleware for routes that require authentication
app.use(['/users'], authenticateJWT);

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Retrieve all users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Retrieve a single user by ID
app.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user by ID
app.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user attributes
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      // If a new password is provided, hash and update it
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    // Send a success message with the updated user
    res.status(200).json({ message: 'User successfully updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.status(204).json({ message: 'User successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/song', async(req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
})
app.get('/songs/:songId', async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findByPk(songId);

    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/song', async (req, res) => {
  try {
    const { title,duration, releaseDate, audioURL,} = req.body;
  
    const newSong = await Song.create({
      title,
      duration,
      releaseDate, audioURL,
    });
    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/song/:songId', async (req, res) => {
  try {
    const songId = req.params.songId;
    const { title,duration, releaseDate, audioURL,} = req.body;

    // Find the user by ID
    const song = await Song.findByPk(songId);

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Update user attributes
    song.title = title || song.title;
    song.duration = duration || song.duration; 
    song.releaseDate = releaseDate || song.releaseDate;
    song.audioURL = audioURL || song.audioURL;

    

    // Save the updated user
    await song.save();

    // Send a success message with the updated user
    res.status(200).json({ message: 'User successfully updated', song });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/song/:songId', async (req, res) => {
  try {
    const songId = req.params.songId;

    // Find the user by ID
    const song = await Song.findByPk(songId);

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Delete the user
    await song.destroy();

    res.status(204).json({ message: 'Song successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve all genres
app.get('/genres', async (req, res) => {
  const genres = await Genre.findAll();
  res.json(genres);
});

// Retrieve a single genre by ID
app.get('/genres/:genreId', async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const genre = await Genre.findByPk(genreId);

    if (genre) {
      res.json(genre);
    } else {
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new genre
app.post('/genres', async (req, res) => {
  try {
    const { genreName } = req.body;
    const newGenre = await Genre.create({
      genreName,
    });
    res.status(201).json(newGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a genre by ID
app.put('/genres/:genreId', async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const { genreName } = req.body;

    // Find the genre by ID
    const genre = await Genre.findByPk(genreId);

    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    // Update genre attributes
    genre.genreName = genreName || genre.genreName;

    // Save the updated genre
    await genre.save();

    // Send a success message with the updated genre
    res.status(200).json({ message: 'Genre successfully updated', genre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/genres/:genreId', async (req, res) => {
  try {
    const genreId = req.params.genreId;
    // Find the genre by ID
    const genre = await Genre.findByPk(genreId);

    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    // Delete the genre
    await genre.destroy();

    res.status(204).json({ message: 'Genre successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve all artists
app.get('/artists', async (req, res) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

// Retrieve a single artist by ID
app.get('/artists/:artistId', async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const artist = await Artist.findByPk(artistId);

    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new artist
app.post('/artists', async (req, res) => {
  try {
    const { name, artistURL } = req.body;
    const newArtist = await Artist.create({
      name,
      artistURL,
    });
    res.status(201).json(newArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an artist by ID
app.put('/artists/:artistId', async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const { name, artistURL } = req.body;

    // Find the artist by ID
    const artist = await Artist.findByPk(artistId);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    // Update artist attributes
    artist.name = name || artist.name;
    artist.artistURL = artistURL || artist.artistURL;

    // Save the updated artist
    await artist.save();

    // Send a success message with the updated artist
    res.status(200).json({ message: 'Artist successfully updated', artist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/artists/:artistId', async (req, res) => {
  try {
    const artistId = req.params.artistId;
    // Find the artist by ID
    const artist = await Artist.findByPk(artistId);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    // Delete the artist
    await artist.destroy();

    res.status(204).json({ message: 'Artist successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example route with authentication
app.get('/authenticated-route', (req, res) => {
  res.json({ message: 'Authenticated route', user: req.user });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});