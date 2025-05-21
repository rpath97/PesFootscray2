const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api/radio-channels', async (req, res) => {
  try {
    const remoteUrl = 'https://prov01.stellar.care/aflex5/playlists/33_5_9.php';
    console.log('Fetching:', remoteUrl);
    const response = await fetch(remoteUrl); // Node.js v18+ has fetch built-in!
    console.log('Response status:', response.status);
    if (!response.ok) {
      console.error('Remote fetch failed:', response.statusText);
      return res.status(response.status).json({ error: 'Failed to fetch radio channels' });
    }
    const data = await response.text();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to fetch radio channels' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));