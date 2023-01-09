const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require("bcrypt")

const register = require('./models')

/*const mware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    next();
  };*/

router.post('/register',async  (req,res) => {

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const epassword = await bcrypt.hash(req.body.Password,salt)

    const newuserdata = new register({
        Username : req.body.Username,
        Email : req.body.Email,
        Password : epassword
    })
    newuserdata.save()
    //.then(res => {
        .then(console.log(newuserdata)
        
    //}
    )

    .catch(error => {
        res.json(error)
        
    })
}),

router.get('/register',(req,res) => {
    res.send('get request success yahoo!')
})

router.post('/login', async (req,res) => {
    //const {Username, Password} = req.body
    
    console.log('1st line')
    console.log(req.body.Username)
    console.log('2nd line')
    const user = register.find( {Username: req.body.Username}, (err,data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
        }
    })
    

    if(user == null) {
        //return res.status(400).send('cant find user')
        return res.send('cant find user')
        
    }
    try{
        if(await bcrypt.compare(req.body.Password, user.Password )){
           //return res.send('success')
           const accessToken = generateAccessToken(user)
           return res.json({accessToken: accessToken})
       
           function generateAccessToken(user) {
               return jwt.sign({user: user.Username, password : user.Password} ,process.env.ACCESS_TOKEN_SECRET)
           }
        } else{
            res.send('not allowed')
        }
    } catch {
        res.send('not working')
    }
 //, (err, user) => {
        //if(err) return res.json(err)
  //      res.json(user)
  //  })
  //  console.log(user)


    
})

module.exports = router