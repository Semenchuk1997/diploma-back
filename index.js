const express = require('express'),
    app = express();

app.get('/', (req, res) => {
  res.send('Fuck you bitch!')
})

app.listen(3000, () => console.log('Server running on port 3000'))