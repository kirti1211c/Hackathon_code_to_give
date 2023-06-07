// var surveyData = [];
// var maxResponses = 2;

// for (var i = 0; i < maxResponses; i++) {
//     var name = prompt("Enter name for survey response " + (i + 1));
//     var contact = prompt("Enter contact for survey response " + (i + 1));
//     var date = prompt("Enter date of survey for survey response " + (i + 1));
//     var serialNo = i + 1;

//     surveyData.push({
//         serialNo: serialNo,
//         surveyName: name,
//         contact: contact,
//         date: date
//     });

const user = require('../models/user.js')
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
    console.log(volunteer);
    console.log(counsel);
});




var tableBody = document.getElementById("surveyTable").getElementsByTagName("tbody")[0];

volunteer.forEach(function (survey) {
    var row = tableBody.insertRow();

    Object.values(survey).forEach(function (value) {
        var cell = row.insertCell();
        cell.textContent = value;
    });
});

// Export to Excel
var exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", function () {
    var workbook = XLSX.utils.table_to_book(document.getElementById("surveyTable"), { sheet: "Survey Data" });
    XLSX.writeFile(workbook, "survey_data.xlsx");
});