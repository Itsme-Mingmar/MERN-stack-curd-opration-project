let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate } = require('../../controllers/web/enquiryController');
let enquiryRoutes = express.Router();

enquiryRoutes.post('/insert', enquiryInsert);
enquiryRoutes.post('/view', enquiryList);
enquiryRoutes.delete('/delete/:id', enquiryDelete);
enquiryRoutes.get('/edit/:id', enquiryEdit);
enquiryRoutes.put('/update/:id', enquiryUpdate);
module.exports = enquiryRoutes;
