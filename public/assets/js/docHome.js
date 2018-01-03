var tableDataDiv = $("#patientData");
var patients = [];

getPatients();

function initializeTable() {
    tableDataDiv.empty();
    var rowsToAdd = [];
    for (var i = 0; i < patients.length; i++) {
        rowsToAdd.push(createNewRow(patients[i]));
    }
    tableDataDiv.prepend(rowsToAdd);
}

// Function for retrieving authors and getting them ready to be rendered to the page
function getPatients() {
    $.get("/api/patients", function(data) {
        patients = data;
        initializeTable();
    });
}

function createNewRow(patient) {
    var newInputRow = $(
        [
            "<td>",
            "<span>",
            patient.text,
            "</span>",
            "</td>"
        ].join("")
    );
    newInputRow.data("patient", patient);
    return newInputRow;
}
