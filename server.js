// server.js
const express = require('express');
const { Player } = require('cli-sound');
const path = require('path');

const app = express();
const port = 3000;
const player = new Player();

// Path default untuk file MP3 di root folder
const defaultSoundPath = path.resolve(__dirname, 'alert.mp3');

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk memutar suara
app.post('/play-sound', async (req, res) => {
    // Ambil soundPath dari body atau gunakan path default
    const { soundPath } = req.body;
    const filePath = soundPath ? path.resolve(__dirname, soundPath) : defaultSoundPath;

    try {
        await player.play(filePath);
        res.status(200).json({ message: 'Sound played successfully' });
    } catch (error) {
        console.error('Error playing sound:', error);
        res.status(500).json({ message: 'Error playing sound' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
