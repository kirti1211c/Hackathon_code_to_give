const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kirti1211c:dontask77@cluster0.bilxtml.mongodb.net/test?retryWrites=true&w=majority';
const user = require('./models/user.js')
const ques = require('./models/ques.js')

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var ques_set = [];
var qq = [];
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch(err => {
        console.log("error")
        console.log(err)
    })
var qq = [];
ques.find({}).then(pdata => {
    qq = pdata
});

app.get('/', (req, res) => {
    console.log("homeeeee");
    res.render('main.ejs')
})



app.get('/report', (req, res) => {
    console.log("report");
    var ans = []
    user.find({}).then(pdata => {
        ans = pdata
        console.log(ans);
        var all = [];
        var volunteer = [];
        var counsel = [];
        // var name = atob(ans[4].survey_data[0][1]);
        // console.log(name);
        ans.forEach(users => {
            var surveydata = users.survey_data;
            var obj = {};
            var flag_vol = 0;
            var flag_coul = 0;
            surveydata.forEach(uarr => {
                if (uarr[0] === "647cd4419731782982ad9882") {
                    var name = atob(uarr[1]);
                    obj.name = name;
                }
                if (uarr[0] === "648051130d1033015eb9b26f") {
                    obj.contact = uarr[1];
                }
                if (uarr[0] === "64805584e3198be1fd5a3715") {
                    obj.timings = uarr[1];
                }
                if (uarr[0] === "64804ba68eef5d647bbc8823" && uarr[1] === "Yes") {
                    flag_vol = 1;
                }
                if (uarr[0] === "64804b8e9db806247b9ec744" && uarr[1] === "Yes") {
                    flag_coul = 1;
                }

            });
            if (flag_vol === 1) {
                volunteer.push(obj);
            }
            if (flag_coul === 1) {
                counsel.push(obj);
            }
        });
        // console.log(volunteer);
        // console.log(counsel);
        res.render('report.ejs', { volunteer: volunteer, counsel: counsel });
    });

    // res.render('report.ejs');
})


app.get('/admin', (req, res) => {
    console.log("admin");
    res.render('admin.ejs')
})

app.get('/survey', (req, res) => {
    console.log("survey");
    res.render('survey.ejs', { ques: qq });
})

app.post('/survey', urlencodedParser, (req, res) => {
    console.log("post survey--------------------")
    var params = req.body;
    var keys = Object.keys(params);
    var values = Object.values(params);
    var i = 0;
    var arr = []

    keys.forEach(key => {
        if (key === "647cd4419731782982ad9882") {
            let encodedValue = btoa(values[i]);
            arr.push([key, encodedValue]);
            i++;
        } else {
            arr.push([key, values[i]]);
            i++;
        }

    })
    console.log(params);
    user.create({
        survey_data: arr,
        date: new Date().toLocaleDateString()
    })
    console.log("post survey--------------------")

    var name = atob(arr[0][1]);
    res.render('after_survey.ejs', { arr: arr, name });
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Listening!");
})


// user.create({
//     survey_data: [["name", "riya verma"], ["email", "verma@gmail.com"], null, ["scale", "5"], ["addiction", "yes"]],
//     date: new Date().toLocaleDateString()
// })
// ques.create({
//     ques_txt: " If you are willing to talk or volunteer to help, please enter your preferred timings to help us reach out to you.",
//     options: null,
//     multi_correct: false
// })