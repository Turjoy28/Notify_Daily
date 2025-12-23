require('dotenv').config()
 
const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const connectDB=require('./server/config/db')
const app=express();
const port= process.env.PORT || 5000;
const session=require('express-session')
const passport=require('passport')
const MongStore=require('connect-mongo')
const methodOverride = require('method-override');
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongStore.create({
        mongoUrl:process.env.MONGODB_URI
    }),
    cookie:{maxAge: new Date(Date.now()+(3600000))}
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'));
connectDB();
app.use(passport.initialize())
app.use(passport.session())
//Static files

app.use(express.static('public'))

//Templating engine
app.use(expressLayouts)
app.set('layout','./layouts/main')
app.set('view engine','ejs');

//routes
app.use('/',require('./server/routes/auth'))
app.use('/',require('./server/routes/index'))
app.use('/',require('./server/routes/dashboard'))
//handle errors
app.use(function(req,res){
    res.status(404).send('404 Not Found')
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})
