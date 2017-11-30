const express = require('express');
const openRouter = express.Router();
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loremIpsum = require('lorem-ipsum');

const adminMiddleware = require('../middlewares/admin');
const db = require('../models');
const config = require('../config');
// router.use((req, res, next) => {
//   req.accepts('application/json');
// });
openRouter.get('/', (req, res) => {
  res
    .status(200)
    .send('api v1');
});
authRouter.use(adminMiddleware);
// router.use((req, res, next) => {

// });
/*
* users api
*/
openRouter.post('/users/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
    return res.json({
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
      if(!response) 
      return res.json({
        success: false,
        message: 'An error occured: invalid username and/or password.'
      });
      let token = jwt.sign({ user }, process.env.JWT_TOKEN_SECRET || config.jwtToken.secretKey, config.jwtToken.options);
      return res.json({
        success: true,
        message: 'Enjoy your token ヽ༼ຈل͜ຈ༽ﾉ',
        token,
        user,
      });
    });
  })
  .catch(() => {
    return res.json({ 
      success: false,
      message: 'An error occured: invalid username and/or password.'
    });
  });
});
authRouter.get('/users/profile', (req, res) => {
  const user = req.user;
  db.User.findOne({
    where: {
      id: user.id
    },
    attributes: [
      'username',
      'updatedAt',
      'createdAt'
    ]
  })
  .then((user) => {
    return res.json({ 
      success: true,
      user,
    });
  })
  .catch(err => {
    throw Error('User not found in db');
    console.log('ID:' + user.id);
    return res.json({
      success: false,
      message: 'Profile does not exists.'
    });
  });
})
/*
openRouter.post('/users/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
    res.json({
      success: false,
      message: 'An error occured.'
    });
  }

  db.User.findAll({
    where: {
      username: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('username')), 'LIKE', username.toLowerCase()),
    },
  })
  .then(user => {
    if (user.length) {
      return res.json({
        success: false,
        message: `An error occured: user with this credentials already exists.`
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
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: `An error occured.`
      });
    });
  });
});
*/
/*
* posts api
*/
openRouter.get('/posts', (req, res) => {
  db.Post
  .findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    // raw: true,
    attributes: ['id', 'title', 'body', 'createdAt', 'friendlyUrl'],
    include: [
      { 
        model: db.Tag,
        attributes: ['name'] 
      },
      {
        model: db.User,
        attributes: ['username']
      }
    ]
    // include: [{
    //   model: db.Tag,
    //   through: 'postTags',
    //   where: {
    //     name: ''
    //   }
    // }]

    
  })
  .then(posts => res.json(posts));
  // res.send('posts -> wysyłanie danych przez POST i utworzenie postu');
});

openRouter.get('/posts/furl/:friendlyUrl', (req, res) => {
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

openRouter.get('/posts/pagination/:page/:amount', (req, res) => {
  res.send(`posty o ilosci ${req.params.amount} na stronie ${req.params.page}-> pobiera odpowiednia stronę postów z ilością na jednej`);
  const page = req.params.page;
  const amount = req.params.amount;
});

openRouter.get('/posts/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  db.Post
  .findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    // raw: true,
    attributes: ['id', 'title', 'body', 'createdAt', 'friendlyUrl'],
    include: [
      { 
        model: db.Tag,
        attributes: ['name'],
        where: {
          name: tag,
        }
      },
      {
        model: db.User,
        attributes: ['username']
      }
    ]
  })
  .then(posts => res.json(posts));
});

authRouter.post('/posts', (req, res) => {
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
  const UserId = req.user.id;
  const tags = req.body.tags;
  let tagsList = tags.split(' ').map((el) => {
    return {
      name: el,
    };
  });

  const post = {
    title,
    body,
    friendlyUrl,
    UserId,
    Tags: tagsList,
  }
 console.log(tagsList);
  // if(tags) {
  //   let tagsList = tags.split(' ').map((el) => {
  //     return {
  //       name: el,
  //     };
  //   });
  //   post['Tags'] = tagsList;
  // }
  db.Post.create(post, {
    include: [ db.Tag ]
  })
  .then(post => {
    return post;
  })
  .then((post) => {
    console.log(`Post ${post.title} zostal stworzony pomyslnie!`);
    return res.json({
      success: true,
      message: 'Post created successfully.',
      post,
    });
  })
  .catch((err) => {
    console.log(`Nie powiodlo sie utworzenie posta :(`);
    return res.json({
      success: false,
      message: 'An error occured.',
      err,
    });
  });
});


authRouter.put('/posts/:id', (req, res) => {
  res.send(`post -> update posta od id ${req.params.id}`);
});

authRouter.delete('/posts/:id', (req, res) => {
  const postID = req.params.id;
  db.Post.findOne({
    where: {
      id: postID,
    }
  })
  .then((post) => {
    return post.destroy();
  })
  .then(() => {
    return res.json({
      success: true,
      message: 'Post deleted successfully.',
    });
  })
  .catch((err) => {
    return res.json({
      success: false,
      message: err,
    });
  });
});

/*
* categories api
*/

authRouter.route('/categories')
  .get((req, res) => {
    res.send(`pobranie info o wszystkich kategoriach`);
  })
  .post((req, res) => {
    res.send(`dodanie nowej kategorii`);
  });

authRouter.route('/categories/:id')
  .get((req, res) => {
    res.send(`pobranie info o kategorii nr ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`usuniecie kategorii nr ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update kategorii nr ${req.params.id}`);
  });

module.exports.authRouter = authRouter;
module.exports.openRouter = openRouter;
