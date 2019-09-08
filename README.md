# Achievement.js

A Node.js library for tracking user achievements and progress using express and MongoDB. Project Architecture can be found [here](https://www.lucidchart.com/documents/view/fb160706-6f61-4ea6-b010-68c3e3bb462c/0_0).

---

## Table of Contents

* [Install](#Install)
* [Overview](#Overview)
  * [Connect to express and MongoDB](#Connect-your-express-app-to-achievement.js)
* [API](#API)
  * [achievements](#achievements)
  * [users](#users)

---

## Install

```sh
npm install achievement-js --save
```

## Overview

### Connect your express app to achievement.js

Achievement.js will automatically monitor your api endpoints for tracking user achievements once connected. All you will need to do is add users and add achievements. Let Achievement.js do the rest.

```javascript
const express = require('express');
const app = express();

const options = {
  {
    scope: '/api/achievements',
    MongoURI: {
      database: 'achievement',
      user: 'username',
      password: 'password',
      host: '127.0.0.1',
      port: '27017'
    }
  }
};

const achievementjs = require('achievement-js')(options);

app.use(achievementjs.router);

```


## API

### achievements
The achievements API is used for interacting with Achievement objects.

`add(options)`

### users
The users API is used for interactive with Users and tracking their achievement progress.

`add(options)`
