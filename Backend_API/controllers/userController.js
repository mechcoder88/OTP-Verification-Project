// Importing ".env" module to use".env" file
import dotenv from 'dotenv';
dotenv.config();

/*
? Steps for Message Bird OTP Verification
(1.) Create a Free Message Bird Account. Link : "https://messagebird.com/". Sample Account Details is in ".env" file.
(2.) Create an Access Key.
(3.) Install "messagebird" module by typing "npm install messagebird" in the terminal of your project.
(4.) Go to messagebird github repository to get the Import Code
(5.) For OTP Send Sample Code, Go to Link : "https://developers.messagebird.com/api/verify/#request-a-verify"
From Left Side Navigation Bar, Under "Verify" Section, inside "request" Option, Sample Code is Present (Choose "Node" Option from the Sample Code Option Menu). 
? Example OTP Send Request Code :
var params = {
    originator: 'YourName'
};

messagebird.verify.create('31612345678', params, function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});

? Example OTP Sent Response
{
    id: 'd015e66b7f1f459892130425aabb99e1',
    href: 'https://rest.messagebird.com/verify/d015e66b7f1f459892130425aabb99e1',
    recipient: 31612345678,
    reference: null,
    messages: {
        href: 'https://rest.messagebird.com/messages/76ccc5cc2c42441595d71c4d646ef512'
    },
    status: 'sent',
    createdDatetime: '2018-09-08T13:06:03+00:00',
    validUntilDatetime: '2018-09-08T13:06:33+00:00'
}

(5.) For OTP Verify Sample Code, Go to Link : "https://developers.messagebird.com/api/verify/#request-a-verify"
From Left Side Navigation Bar, Under "Verify" Section, inside "Verify token/View" Option, Sample Code is Present (Choose "Node" Option from the Sample Code Option Menu). 
? Example OTP Verify Request Code :
* ID returned upon creating the verify.
var id = 'd015e66b7f1f459892130425aabb99e1';

* User provided token to validate.
var token = '123456';

messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
? Example OTP Verify Response : 

{
    id: 'd015e66b7f1f459892130425aabb99e1',
    href: 'https://rest.messagebird.com/verify/d015e66b7f1f459892130425aabb99e1',
    recipient: 31612345678,
    reference: null,
    messages: {
        href: 'https://rest.messagebird.com/messages/76ccc5cc2c42441595d71c4d646ef512'
    },
    status: 'sent',
    createdDatetime: '2018-09-08T13:06:03+00:00',
    validUntilDatetime: '2018-09-08T13:06:33+00:00'
}
*/

// Importing "messagebird' module"
import { initClient } from 'messagebird';
const messagebird = initClient(process.env.MsgBirdAPIKey);

// Creating "userController" Class
class userController {
    // TODO : Sending OTP to User
    static userLogin = async (req, res) => {
        // JavaScript Destructuring Concept is being used here to extract phnumber from "req" object
        const { phnumber } = req.body;
        const phoneNumber = "+91" + phnumber;
        console.log(`OTP Phone Number : `, phoneNumber);
        var params = {
            msgTemplate: 'Your Verification Code is %token', // Note : The template of the message must contain "%token" for the verification code to be included in it. 
            timeout: 86400, // 1 Day = 86400 Seconds
            type: "sms", // By Default type is "sms"
        };

        messagebird.verify.create(phoneNumber, params, function (err, response) {
            // OTP Send Failed
            if (err) {
                console.log(`OTP Sending Error : `, err);
                res.status(400).send({ "status": "failed", "message": `Unable to Send OTP to '${phnumber}' !!` });
            }
            // OTP Send Success
            console.log(`OTP Send Response Object : \n`, response);
            res.status(200).send({ "status": "success", "message": `OTP Sent Successfully to '${phnumber}' !!`, "Response": response, "Response ID": response.id });
        });

        /*
        Postman's RequestType : 'POST'
        Postman's URL : "http://localhost:8000/api/user/login"
        Postman's Headers : [Key : 'Accept' & Value : 'application/json']
        Postman's Body [Data : 'Raw' & Data Type : 'JSON']: 
        {
            "phnumber" : 8800312937
        } 
        */
    }

    // TODO : Verifying OTP of the User
    static verifyUser = async (req, res) => {
        // * id : ID returned upon creating the verify.
        // * token : User provided token to validate.
        const { id, token } = req.body;
        console.log(`ID : ${id} \ntoken(OTP) : ${token}`);
        // * Verification Code
        messagebird.verify.verify(id, token, function (err, response) {
            // OTP Verify Fail
            if (err) {
                console.log(`OTP Verify Error : `, err);
                res.status(400).send({ "status": "failed", "message": `Unable to Verify OTP !!` });
            }
            // OTP Verify Success
            console.log(`OTP Verify Response Object : \n`, response);
            res.status(200).send({ "status": "success", "message": `OTP Verified Successfully !!`, "Response": response, "Response ID": response.id });
        });
        /*
        Postman's RequestType : 'POST'
        Postman's URL : "http://localhost:8000/api/user/verify"
        Postman's Headers : [Key : 'Accept' & Value : 'application/json']
        Postman's Body [Data : 'Raw' & Data Type : 'JSON']: 
        {
            "id" : "<ID returned upon creating the OTP/Token>",
            "token" : "<User provided token to validate>"
        }
        Eg : 
        {
        "id" : "d015e66b7f1f459892130425aabb99e1",
        "token" : "723800"
        }
        */
    }
}

export default userController;