let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const enquiryRoutes = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/enquiry',enquiryRoutes)
  //connect to mongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Database connection succesfully.");
    app.listen(process.env.PORT || 3000, ()=>{
        console.log("Surver is running...")
    })
}).catch((err)=>{
    console.log(err)
});
