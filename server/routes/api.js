const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loremIpsum = require('lorem-ipsum');

const adminMiddleware = require('../middlewares/admin');
const db = require('../models');
const config = require('../config');
// router.use((req, res, next) => {
//   req.accepts('application/json');
// });
router.get('/', (req, res) => {
  res.send('api v1');
});
// router.use((req, res, next) => {

// });
/*
* users api
*/
router.post('/users/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
    res.json({
      success: false,
      message: 'Dont even try ( ͠° ͟ʖ ͡°)'
    });
  }
  db.User.findOne({
    where: {
      username: username
    }
  })
  .then(user => {
    const hash = user.password;
    bcrypt.compare(password, hash)
    .then((response) => {
      if(!response) res.json({
        success: false,
        message: 'An error occured: invalid username and/or password.'
      });
      let token = jwt.sign({ user }, config.jwtToken.secretKey);
      res.json({
        success: true,
        message: 'Enjoy your token ヽ༼ຈل͜ຈ༽ﾉ',
        token
      });
    });
  })
  .catch(() => {
    res.json({ 
      success: false,
      message: 'An error occured: invalid username and/or password.'
    });
  });
});

router.post('/users/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
    res.json({
      success: false,
      message: 'An error occured.'
    });
  }
  bcrypt.hash(password, config.password.saltRounds)
  .then((hash) => {
    db.User.create({
      username: username,
      password: hash,
    })
    .then(() => {
      res.json({
        success: true,
        message: `Account ${username} has been registered successfully!`
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `An error occured: user with this credentials already exists.`
      });
    })  ;
  })
  .catch(() => {
    res.json({
      success: false,
      message: `An error occured.`
    });
  });
});

/*
* posts api
*/
router.get('/posts/:friendlyUrl', (req, res) => {
  db.Post.findOne({
    where: {
      friendlyUrl: req.params.friendlyUrl
    },

    include: [{
      model: db.User,
      where: {
        id: db.sequelize.col('Post.UserId')
      },
      attributes: ['username']
    }]
  })
  .then(post => res.json(post))
  .catch((err) => {
    res.json({
      success: false,
      message: 'Post does not exists.'
    });
  });
  // res.send(`post o id ${req.params.friendlyUrl}->  pobiera informacje o poście tj. tło, treść, autor itp...`);
});





router.get('/posts/:page/:amount', (req, res) => {
  res.send(`posty o ilosci ${req.params.amount} na stronie ${req.params.page}-> pobiera odpowiednia stronę postów z ilością na jednej`);
  const page = req.params.page;
  const amount = req.params.amount;
});

// router.use(adminMiddleware);

router.get('/posts', (req, res) => {
  db.Post
  .findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    raw: true,
    attributes: ['title', 'body', 'createdAt', 'friendlyUrl'],
    include: [{
        model: db.User,
        where: {
          id: db.sequelize.col('Post.UserId')
        },
        attributes: ['username']
    }]
  })
  .then(posts => res.json(posts));
  // res.send('posts -> wysyłanie danych przez POST i utworzenie postu');
});

router.post('/posts', (req, res) => {
  const title = req.body.title;
  const body = req.body['body'] || loremIpsum({ 
    count: 2, 
    units: 'paragraphs', 
    paragraphLowerBound: 2,
    paragraphUpperBound: 5,
    format: 'html'
  });
  if(!title || !body) {
    return res.json({
      success: false,
      message: 'An error occured.'
    });
  }
  const friendlyUrl = req.body.friendlyUrl || title.split(' ').map((word) => word.toLowerCase()).join('-');
  // res.json({
  //   title,
  //   body,
  //   friendlyUrl
  // });
  db.User.findOne()
  .then((user) => {
    db.Post.create({
      title: title,
      body: body,
      friendlyUrl: friendlyUrl,
      UserId: user.id
    })
    .then(() => {
      res.json({
        success: true,
        message: 'Post created successfully.'
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: 'An error occured.'
      });
    });
  })
  .catch(() => {
    res.json({
      success: false,
      message: 'An error occured.'
    });
  });

  // db.Post.create({

  // })
});


router.put('/posts/:friendlyUrl', (req, res) => {
  res.send(`post -> update posta od id ${req.params.friendlyUrl}`);
});

router.delete('/posts/:friendlyUrl', (req, res) => {
  res.send(`post -> usuniecie posta z id ${req.params.friendlyUrl}`);
});

/*
* categories api
*/

router.route('/categories')
  .get((req, res) => {
    res.send(`pobranie info o wszystkich kategoriach`);
  })
  .post((req, res) => {
    res.send(`dodanie nowej kategorii`);
  });

router.route('/categories/:id')
  .get((req, res) => {
    res.send(`pobranie info o kategorii nr ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`usuniecie kategorii nr ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update kategorii nr ${req.params.id}`);
  });

module.exports = router;
