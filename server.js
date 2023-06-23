const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dblink = 'mongodb+srv://admin:eNqdgeS5O3290o7f@cluster0.qyh9vco.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dblink)
.then(function(db){
    console.log("mongoDB connected!");
})
.catch(function(err){
    console.log(err);
})

app.listen(3000);

const authRouter = express.Router();

app.use(express.json());
app.use("/auth",authRouter);

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp);

function getSignUp(req,res){
    res.sendFile('/volunteer/volunteersForm.html',{root:__dirname});
}
function postSignUp(req,res){
    let {name,email,address,state,phno} = req.body;
    let user = {
        name : name,
        email : email,
        address : address,
        state : state,
        phno : phno
    }

    userModel.create(user);
    res.json({
        message : "user signed up successfully"
    })
    
}

const volunteerSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true,
    }  ,
    state : {
        type : String,
        required : true,
    },
    phno : {
        type : Number,
        required : true
    }
});


const userModel = mongoose.model('Volunteers',volunteerSchema);

