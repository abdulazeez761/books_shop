const express=require("express");
const path=require("path");
const ejs=require("ejs");
const app=express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'html _files'));
app.use('/styles', express.static(path.join(__dirname, 'styles')))


// that's our data
let  data=[
    
    {id:'1', name:'Artifical intellgencd', category:'IT', pic:"/styles/it.jpg"},
    {id:'2', name:'ORGANIC Chemistry', category:'chemistry', pic:"/styles/chem.jpg"},
    {id:'3', name:'Advanced Physics', category:'PHYSICS', pic:"/styles/phx.jpg"},
    {id:'4', name:'it book', category:'IT', pic:"/styles/it2.jpg"}
] 
    //here we calling the main page 
   app.get('/', (req , res)=>{
       res.render('home', {data:data})
   })
   /* here we will call Specific books when we click on 
   filter category query will compare query data with the data 
   that i want if
    it matches it will 
    return the object that has the datat and send it to ejs page */
    
    app.get('/filter', (req, res)=>{
        
    let temp = [];
    
    if(Object.keys(req.query).length == 0) {
        //console.log('all')
            res.render('home', {data:data})
            console.log('data')   
        } else {
           // console.log('not')
            for(let i = 0; i < Object.keys(data).length; i++){
                if(data[i]['category'] == req.query.category){
                    temp.push(data[i])
                    
                 
                } 
                
            }
            
            res.render('home', {data:temp})
        } 
        
       
    })
    /*
    app.get('/details', (req, res)=>{
        
        const data = [{id:'1',title:'ADVANCED PHYSICS', description:'this booke for  it', pric: '15$',pic:  "/styles/it2.jpg"},
        {id:'2',title:'Artifical intellgencd', description:'this booke talk about machine learning ', pric: '25$',pic:"/styles/it.jpg"},
        {id:'3',title:' PHYSICS', description:'this booke for  advinced physics', pric: '50$', pic:"/styles/phx.jpg" },
        {id:'4',title:' chemistry ', description:'this booke talk about chemistry', pric: '54$', pic: "/styles/chem.jpg" }
     ]
     
        res.render('second', data[0])
    }) */
    /* here we wll use req.params that makes the router dynamic. in the code below i told him
        when someone click one some booke and that book has an id, (because I told hime when some one click on it 
        get the url /prudoct/:id each book has an id) the code compare the book id with the 
        data id and returned the matched id 
    */
   app.get('/product/:id', (req, res)=>{
   
    let  data=[
    
        {id:'1', title:'Artifical intellgencd', description:'this book for it ',pric:'45' ,pic:"/styles/it.jpg"},
        {id:'2', title:'ORGANIC Chemistry', description:'this book for chemistry',pric:'25' , pic:"/styles/chem.jpg"},
        {id:'3', title:'Advanced Physics', description:'this book PHYSICS', pric:'15' ,pic:"/styles/phx.jpg"},
        {id:'4', title:'it book', description:'this book for IT', pric:'40' ,pic:"/styles/it2.jpg"}
    ]
let bookData= [];
const id = req.params.id;


     for(let i =0 ; i < Object.keys(data).length; i++){
        if(data[i]['id']==id){
            bookData.push(data[i])
            
        }
     }
     res.render('product', {
        bookData:bookData
     })
     ///console.log(bookData)
    }) 
    /* here the creating account field when someone click on login it will return the login page and 
    send the data that the server  received then send it in another page  using req.body  
    */
    app.get('/login',(req,res)=>{
        res.render('login')
        
    })
   app.post('/signup', (req,res)=>{
       let info = {
        username: req.body.username, email: req.body.email ,password: req.body.pass
       }
       res.render('account_info', {info:info})
   })
   /*  here we will do the same but the different is will send the data using the url (req.query)*/
   app.get('/query',(req,res)=>{
    res.render('query')
    
})
//first we should change the method to get because the query send using the url
//then we should chang the form method to get
app.get('/signup', (req,res)=>{
   let info = {
    username: req.query.username, email: req.query.email ,password: req.query.pass
   }
   res.render('account_info', {info:info})
}) 

   
    
app.listen(3000,()=>{
    console.log(`express server running on 3000`);
});