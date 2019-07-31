const express = require('express');

const app = express();

app.listen(PORT, () => {
  console.log('application running');
});

const options = {};

const Achievement = require('../')(options);

Achievement.register(
  {
    title: 'Find Intro in a news post',
    action: '/api/achievements/find-intro'
  }
);

Achievement.addUser(
  {
    userID: 'some random and unique guid'
  }
);


app.use(Achievement);

// -------------------------------------------------
// rest of application