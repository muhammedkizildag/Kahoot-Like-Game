const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');



mongoose.connect("mongodb://localhost:27017/kahoot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.log("Bağlantı hatası:", err));

const userSchema = new mongoose.Schema({
  username: String,
  hashedPassword: String
});

const User = mongoose.model('User', userSchema);


//////////


const sessionSchema = new mongoose.Schema({
  userID: String,
  token: String,
  createdAt: { type: Date, default: Date.now() }
})

const Session = mongoose.model('Session', sessionSchema);


////////////


const examSchema = new mongoose.Schema({
  name: String,
  userID: String,
  questions: Array,
});

const Exam = mongoose.model('Exam', examSchema);






const app = express();
app.use(cors({
  origin: 'http://10.0.61.41:5173',
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://10.0.61.41:5173',
    methods: ['GET', 'POST']
  }
});









app.get('/session-check', async (req, res) => {
  const sessionToken = req.cookies.session;

  if (sessionToken) {
    const session = await Session.findOne({ token: sessionToken });

    if (session) {
      const user = await User.findById(session.userID);

      res.status(200).json({ isLoggedIn: true, username: user.username });
    }
    else {
      res.status(200).json({ isLoggedIn: false });
      res.clearCookie('session');
    }
  }

  else {
    res.status(401).json({ isLoggedIn: false });
  }

});


app.get('/get-exams', async (req, res) => {
  const sessionToken = req.cookies.session;

  if (sessionToken) {
    const session = await Session.findOne({ token: sessionToken });
    const _exams = await Exam.find({ userID: session.userID })

    const exams = _exams.map(e => {
      const obj = e.toObject();
      delete obj.userID;
      return obj;
    });

    res.status(200).json(exams);

  }
});



app.get('/logout', async (req, res) => {
  const sessionToken = req.cookies.session;
  await Session.deleteOne({ token: sessionToken });
  res.clearCookie('session');
  res.status(200).json({ isLoggedOut: true });
});



app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const isExists = await User.exists({ username: username });

  if (isExists) {
    res.status(401).send("Kullanıcı adı önceden alınmış.");
  }

  else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      hashedPassword: hashedPassword
    })

    newUser.save()
      .then(async (doc) => {
        console.log('Kullanıcı başarıyla oluşturuldu.');

        const sessionToken = crypto.randomBytes(32).toString('hex');
        const newSession = new Session({
          userID: doc._id.toString(),
          token: sessionToken
        })

        await newSession.save();

        res.cookie('session', sessionToken, {
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000,
          secure: false
        });
        res.status(200).send("Kullanıcı başarıyla oluşturuldu.");
      })
      .catch(err => {
        console.log('Kullanıcı kaydedilirken hata oluştu.', err);
        res.status(401).send('Kullanıcı kaydedilirken hata oluştu.');
      })
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {

    if (await bcrypt.compare(password, user.hashedPassword)) {
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const session = new Session({
        userID: user._id.toString(),
        token: sessionToken
      });

      await session.save();

      res.cookie('session', sessionToken, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
      });
      res.status(200).json({ isLoggedIn: true });
    }
    else {
      res.status(401).json({ isLoggedIn: false, message: 'şifre yanlış' })
    }
  }

  else {
    res.status(400).json({ isLoggedIn: false, message: 'kullanıcı adı yanlış' })
  }
});


app.post('/add-exam', async (req, res) => {
  const { name, questions } = req.body;
  const sessionToken = req.cookies.session;
  const session = await Session.findOne({ token: sessionToken });

  if (session) {

    const newExam = new Exam({
      name: name,
      questions: questions,
      userID: session.userID
    })

    await newExam.save();
    res.status(200).send();
  }

  else {
    res.status(400).send();
  }


});





const active_games = [{
  id: '157f',
  admin: 'asdd',
  questions: [],
  current_question: 0,
  isStarted: false,
  participants: [{ nickname: 'fes', point: 0 }]
}];






io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı:', socket.id);

  socket.on('create_game', (data, response) => {
    const id = crypto.randomBytes(2).toString('hex');

    active_games.push({
      id: id,
      admin: data.username,
      questions: data.questions,
      current_question: 0,
      isStarted: false,
      participants: []
    });

    console.log(id);
    socket.join(id);

    response({ isCreated: true, id: id });
  });

  socket.on('join_game', (data, response) => {
    
    let isCurrent = false;
    let id;
    console.log(data)
    active_games.forEach(e => {
      if (e.id == data.id) {
        console.log('asdasf')
        isCurrent = true;
        id = e.id
        e.participants.push({nickname: data.nickname, point: 0});
        console.log(e.participants);
        console.log(data);
      };
    });

    if (isCurrent) {
      socket.join(id);
      console.log();
      response({ isJoined: true });
    }
    else response({ isJoined: false });

  });

  socket.on('start_game', (data, response) => {
    active_games.forEach(e => {
      if (e.admin == data.username && e.id == data.id) {
        e.isStarted = true;
        io.to(e.id).emit('game', { isStarted: true, question: e.questions[e.current_question] });
        e.current_question++;

        const intervalID = setInterval(() => {
          io.to(e.id).emit('game', { isStarted: true, question: e.questions[e.current_question] });
          e.current_question++;

          if (e.current_question == e.questions.length) {
            clearInterval(intervalID);
            console.log('cleared');
            setTimeout(() => io.to(e.id).emit('finish', {result: e.participants}), 15000);
          }
        }, 15000);

    
        response({ isStarted: true });
      }
    })
  })

  socket.on('answer', (data, response) => {
    active_games.forEach(e => {
      if ((e.id == data.id) && (e.questions[e.current_question-1].correctAnswer == data.answer)) {
        e.participants.forEach(el => {
          if (el.nickname == data.nickname) el.point += 10;  
        });
      }

    })
    response({ status: true });
  });

  

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});




server.listen(3001, '0.0.0.0', () => {
  console.log('Socket.IO sunucusu 3001 portunda çalışıyor');
});