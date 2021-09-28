const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`Server Listiening on port ${port}`);
});