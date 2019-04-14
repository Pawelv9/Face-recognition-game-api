const express = require ('express');
const bodyParser = require ('body-parser')
const cors = require ('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const key = require('./key')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: key.PASSWORD,
        database: 'face'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    // res.send(database.users);
    res.send('Hello');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 8000, () => {
    console.log(`Spaceship is starting on platform ${process.env.PORT}`);  
})