const express = require('express');
const sequelize = require('./sequelize');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Song = require('./models/Song');
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
app.use(['/users', '/songs'], authenticateJWT);

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

// Example route with authentication
app.get('/authenticated-route', (req, res) => {
  res.json({ message: 'Authenticated route', user: req.user });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});