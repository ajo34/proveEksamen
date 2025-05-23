
//Modular imports
import * as sql from "./modules/sql.js";
import * as mw from "./modules/middleware.js";


// Node imports
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import path from 'path';


const app = express();

// get a fixed path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//session
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

//linking to login page
app.get('/', (req, res) => {
    res.redirect('/login/');
})



app.get('/home', (req, res) => {
    if (req.session.user.roleID == 'Admin') {
        res.redirect('/admin/')
    } else if (req.session.user.roleID == 'IT-medarbeider') {
        res.redirect('/IT/')
    }
    //res.redirect('/login/');
})



app.post('/login', (req, res) => {
    const {username, password} = req.body
    const user = sql.getUserByName(username)
    if (!user) {
        res.send('user does not exist')
    } else if (user.password != password) {
        console.log('Wrong password: ', password, 'right: ', user.password, 'user:', user)
        res.send('wrong password')
    } else {
        req.session.user = user
        
        res.redirect('/home')
    }
})


app.get('/fetchallusers/', (req, res) => {
    console.log('fetching users...')
    res.send(sql.getUsers())
})

app.post('/createuser', (req, res) => {

    const newUser = req.body
    console.log('new user: ', req.body)

    const user = sql.getUserByName(newUser.username)
    if (user) {
        res.send('User already exists')
    } else {
        req.session.user = newUser
        console.log(newUser)
        sql.createUser(newUser.name, newUser.adress, newUser.phone, newUser.username, newUser.computer, newUser.password, sql.getRoleIDByName(newUser.role))
        res.redirect('/home')
    }
    
    
})



app.use(express.static(staticPath));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
