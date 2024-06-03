const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/5644c3035c"; // Replace this with your API endpoint URL

    const options = {
        method: "POST",
        auth:"mandeep:35abe769b488685575dfd3688bebe764-us13"    };

    const request = https.request(url, options, function(response) {
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");   
            }


        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT||3000, function() {
    console.log("Server is running on port 3000");
});


// 35abe769b488685575dfd3688bebe764-us13

// list id- 
// 5644c3035c

// const url="https://mandrillapp.com/api/1.0/users/lists/56https://13.api.mailchimp.com/3.0/lists/5644c3035c/members44c3035c"
// auth:"mandeep:35abe769b488685575dfd3688bebe764-us13"