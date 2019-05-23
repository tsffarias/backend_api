import * as mongoose from 'mongoose';
import { StudentSchema } from '../models/student';
import { Request, Response } from 'express';
import { APIError, PublicInfo } from '../shared/messages';

const StudentMongooseModel = mongoose.model('Student', StudentSchema);

export class StudentController { 

    public addNewStudent (req: Request, res: Response) { 
            
        let newStudent = new StudentMongooseModel(req.body);

        // Create a new student
        newStudent.save((err, data) => {
            if (err){
                if (err.name === 'ValidationError') {
                    return res.send(APIError.errMissingBody());
                }
            }    
            res.json(PublicInfo.infoCreated({ data: data }));
        });
    }

    // Get all students
    public getStudents (req: Request, res: Response) {           
        StudentMongooseModel.find({}, (err, data) => {
            if (err){
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data.length) {
                // there are student(s)
                res.json(data);
            } else {
                // there are no students
                return res.send(APIError.errNotFound());
            }
        });
    }

    // Get a specific student
    public getStudentById (req: Request, res: Response) {           
        StudentMongooseModel.findById(req.params.studentId, (err, data) => {
            if (err){
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data) {
                // there is student
                res.json(data);
            } else {
                // there is no student
                return res.send(APIError.errNotFound());
            }
        });
    }

    // Update a specific student
    public updateStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, 
            (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(PublicInfo.infoUpdated({data: data}));
        });
    }

    // Delete a specific student
    public deleteStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndRemove({ _id: req.params.studentId }, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(PublicInfo.infoDeleted());
        });
    }

    // Generate student dummy data
    public generateDummyData (req: Request, res: Response) {     
        var data = [
            {
            "FirstName":"Sally",
            "LastName":"Baker",
            "School":"Mining",
            "StartDate": new Date(Date.now())
            },{
            "FirstName":"Jason",
            "LastName":"Plumber",
            "School":"Engineering",
            "StartDate": new Date(Date.now())
            },{
            "FirstName":"Sue",
            "LastName":"Gardner",
            "School":"Political Science",
            "StartDate": new Date(Date.now())
            },{
            "FirstName":"Linda",
            "LastName":"Farmer",
            "School":"Agriculture",
            "StartDate": new Date(Date.now())
            },{
            "FirstName":"Fred",
            "LastName":"Fisher",
            "School":"Environmental Sciences",
            "StartDate": new Date(Date.now())
            }
        ];
          
        StudentMongooseModel.collection.insertMany(data, function (err, docs) { 
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully generated 5 sample documents!'});
        });
    
    }
}