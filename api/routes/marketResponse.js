const express = require("express");
const router = express.Router();
const auth=require('../../validation/auth')
const Record = require('../../Models/Record');
// const Customer = require("C:\\Users\\WALEED.AHMAD\\Documents\\FYP\\project\\ecom-predictor\\backend\\Models\\Customer.js");
const Customer = require('../../Models/Customer');

var cors = require('cors');
var app = express();
app.use(cors());

//view detail of market response
router.get('/view',auth, function(req, res) {
   // const email = "Hamzakhan003@gmail.com";
   const userId=res.userId

    Customer.findOne({_id:userId})
    .then( data=>{
        if( data ){
            let value=data.SelectedAction.MR;
            let executed= data.SelectedAction.MRexecuted;
            let error=data.SelectedAction.MRerror
            Record.findOne({Customer:userId})
            .then(data1=>{
                if(data1){
                    res.send({
                        value: value,
                        executed: executed,
                        data_upload: data.DataUploaded,
                        record:data1.MR,
                        error:error
                    });
                    

                }
                else{
                    res.send({
                        value: value ,
                        executed: executed,
                        data_upload: data.DataUploaded,
                        error:error,
                    });

                }

            })
       
    }
    });
});


//add in selected action
router.post('/add',auth, function(req, res) {
    const userId=res.userId

    //const email="Hamzakhan003@gmail.com"
    Customer.findOne({_id:userId})
    .then(data=>{
        if(data){

            console.log(data.DataUploaded)
            Customer.updateOne({_id:userId},{'SelectedAction.MR': true},function(err, res) {
                if (err) {
                    throw err
                    console.log(err);
                }   
            });
            res.send({
                message: "Market Response added",
                added: true,
            });

        }
        });

});


//remove from selected action
router.post('/remove',auth, function(req, res) {
    const userId=res.userId

    //const email="Hamzakhan003@gmail.com"
    Customer.findOne({_id:userId})
    .then(data=>{
        if(data){

            console.log(data.DataUploaded)
            Customer.updateOne({_id:userId},{'SelectedAction.MR': false},function(err, res) {
                if (err) {
                    throw err
                    console.log(err);
                }   
            });
            res.send({
                message: "Market Response removed",
                added: false,
            });

        }
        });

});
//download
router.get('/download',function(req, res){
    //return res.download( './excel_files/FPgrowth.xlsx' );
})




module.exports = router;




