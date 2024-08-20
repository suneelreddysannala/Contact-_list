const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contact_list');
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error occured while connecting'));
db.once('open',function(){
    console.log('connection success to database')
})