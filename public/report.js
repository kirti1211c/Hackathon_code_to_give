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





surveyData = [{ name: 'rohan ', contact: '880000800', timings: '12 pm - 4 pm' }];
var tableBody = document.getElementById("surveyTable").getElementsByTagName("tbody")[0];

// surveyData.forEach(function (survey) {
//     var row = tableBody.insertRow();

//     Object.values(survey).forEach(function (value) {
//         var cell = row.insertCell();
//         cell.textContent = value;
//     });
// });

// Export to Excel
var exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", function () {
    var workbook = XLSX.utils.table_to_book(document.getElementById("surveyTable"), { sheet: "Survey Data" });
    XLSX.writeFile(workbook, "survey_data.xlsx");
});