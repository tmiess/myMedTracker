// var express = require("express");
// var router = express.Router();
var db = require("../models/");
var path = require("path");


module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "..", "index.html"));
    });

    //Doctor Form Submit to Table
    app.post("/doctor", function(req, res) {
        db.Doctor.create({
            full_name: req.body.full_name,
            doc_email: req.body.doc_email,
            doc_uid: req.body.doc_uid
        }).then(function(newDoctor) {
            res.sendFile(path.join(__dirname, ".", "docHome.html"));
        });
    });

    //Patient Form Submit to Table
    app.post("/patient", function(req, res) {
        db.Patient.create({
            full_name: req.body.full_name,
            pat_email: req.body.pat_email,
            bday: req.body.bday,
            gender: req.body.gender,
            visit_reason: req.body.visit_reason,
            pat_uid: req.body.pat_uid,
            DoctorId: req.body.DoctorId
        }).then(function(newPatient) {
            res.sendFile(path.join(__dirname, ".", "patHome.html"));
        });
    });

    app.get("/api/doctors/:id/patients", function(req, res) {
        db.Patient.findOne({
            where: {
                DoctorId: req.params.id
            }
        }).then(function(patients) {
            res.json(patients);
        });
    });

    app.get("/api/doctors/:firebaseId", function(req, res) {
        db.Doctor.findOne({
            where: {
                doc_uid: req.params.firebaseId
            }
        }).then(function(doc) {
            res.json(doc);
        });
    });

    app.get("/api/doctors", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Doctor.findAll({
            full_name: req.body.full_name
            // include: [db.Post]
        }).then(function(docName) {
            res.json(docName);
        });
    });


    // router.put("/burgers/update/:id", function(req, res) {
    //     db.Burger.update({
    //         devoured: true
    //     }, {
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(devourBurger) {
    //         res.json("/");
    //     });
    // });

    // router.post("/burgers", function(req, res) {
    //     db.Burger.destroy()
    //         .then(function(allBurgers) {
    //             var hbsObject = { burger: allBurgers };
    //             return res.render("index", hbsObject);
    //         });

    // });
};
