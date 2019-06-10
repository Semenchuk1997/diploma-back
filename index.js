const express = require('express'),
    app = express();

app.get('/gellary', (req, res) => {
  res.send('Fuck you!')
})

app.listen(3000, () => console.log('Server running on port 3000'))