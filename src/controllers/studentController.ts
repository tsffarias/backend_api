import * as mongoose from 'mongoose';
import { StudentSchema } from '../models/student';
import { Request, Response } from 'express';
import { APIError, PublicInfo } from '../shared/messages';

const StudentMongooseModel = mongoose.model('Student', StudentSchema);

export class StudentController { 

    public addNewStudent (req: Request, res: Response) { 
            
        let newStudent = new StudentMongooseModel(req.body);

        newStudent.save((err, data) => {
            if (err){
                if (err.name === 'ValidationError') {
                    return res.send(APIError.errMissingBody());
                }
            }    
            res.json(PublicInfo.infoCreated({ data: data }));
        });
    }

    public getStudents (req: Request, res: Response) {           
        StudentMongooseModel.find({}, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public getStudentById (req: Request, res: Response) {           
        StudentMongooseModel.findById(req.params.studentId, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public updateStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, 
            (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(PublicInfo.infoUpdated({data: data}));
        });
    }

    public deleteStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndRemove({ _id: req.params.studentId }, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(PublicInfo.infoDeleted());
        });
    }

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