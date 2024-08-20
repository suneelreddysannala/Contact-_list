const express=require('express')
const port=8000;
const path=require('path')


const db=require('./config/mongoose')
const Contact=require('./model/contact')
const app= express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))


var contacts=[
    /*{
        name:"suneel reddy",
        number:"9963571978"
    },
    {
        name:"susmitha",
        number:"8790329244"
    }*/
]


app.get('/', async function(req, res) {
    try {
        // Fetch contacts from the database using Mongoose
        const contacts = await Contact.find({});
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error while fetching contacts:', err);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/practice', function(req, res) {
    res.send('This is the practice page');
});




/*app.post('/create-contact', function(req,res){
    contacts.push({
        name:req.body.name,
        number:req.body.number
    })
   Contact.create({
    name:req.body.name,
    number:req.body.number
   },function(err,newContact){
    if(err){
        console.log('error occured while appending the contact')
        return;
    }
    console.log('********',newContact)
    return res.redirect('back')
   })
    //return res.redirect('./')
          
})*/
app.post('/create-contact', async function(req, res) {
    try {
        // Using Mongoose to create a new contact
        const newContact = await Contact.create({
            name: req.body.name,
            number: req.body.number
        });
        console.log('New contact created:', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('Error occurred while adding the contact:', err);
        return res.status(500).send('Internal Server Error');
    }
});


app.listen(port ,function(err){

    if(err){
    console.log('error occured',err)
}
    console.log("successfully running the port ",port)

}
  
);
