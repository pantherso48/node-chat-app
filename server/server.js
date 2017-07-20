const path = require('path');
var express = require('express');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
var app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("server up");
});

// module.exports = {app};
