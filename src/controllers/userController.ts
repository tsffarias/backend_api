import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user';
import { Request, Response } from 'express';
import { APIError, PublicInfo } from '../shared/messages';

const UserMongooseModel = mongoose.model('User', UserSchema);

export class UserController { 

    // Create a new user
    public addNewUser (req: Request, res: Response) { 
            
        let newUser = new UserMongooseModel(req.body);

        newUser.save((err, data) => {
            if (err){
                if (err.name === 'ValidationError') {
                    return res.send(APIError.errMissingBody());
                }
                res.send(err);
            }    
            res.json(PublicInfo.infoCreated({ data: data }));
        });
    }

    // Get all users
    public getUsers (req: Request, res: Response) {           
        UserMongooseModel.find({}, (err, data) => {
            if (err) {
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data.length) {
                // there are user(s)
                res.json(data);
            } else {
                // there are no users
                return res.send(APIError.errNotFound());
            }
        });
    }

    // Get a specific user
    public getUserById (req: Request, res: Response) {           
        UserMongooseModel.findById(req.params.userId, (err, data) => {
            if (err){
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data) {
                // there is user
                res.json(data);
            } else {
                // there is no user
                return res.send(APIError.errNotFound());
            }
        });
    }

    public getUserByCpf (req: Request, res: Response) {           
        
    }

    public getUserByEmail (req: Request, res: Response) {           
        
    }

    // Update a specific user
    public updateUser (req: Request, res: Response) {           
        UserMongooseModel.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, 
            (err, data) => {
            if (err){
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data) {
                // user found
                res.json(PublicInfo.infoUpdated({ data: data }));
            } else {
                // user not found
                return res.send(APIError.errNotFound());
            }
        });
    }

    // Delete a specific user
    public deleteUser (req: Request, res: Response) {           
        UserMongooseModel.findOneAndRemove({ _id: req.params.userId }, (err, data) => {
            if (err){
                if (err.name === 'CastError') {
                    return res.send(APIError.errNotFound());
                }
                res.send(err);
            } else if (data) {
                // user found
                res.json(PublicInfo.infoDeleted());
            } else {
                // user not found
                return res.send(APIError.errNotFound());
            }
        });
    }

    // Generate user dummy data
    public generateUserDummyData (req: Request, res: Response) {     
        var data = [
            {
            "name":"Sally",
            "cpf":"123.123.123-4",
            "email":"test@gmail.com",
            "password":"123Mudar@",
            "registrationDate": new Date(Date.now())
            },{
            "name":"Jason",
            "cpf":"123.123.123-4",
            "email":"test2@gmail.com",
            "password":"123Mudar@",
            "registrationDate": new Date(Date.now())
            },{
            "name":"Sue",
            "cpf":"123.123.123-4",
            "email":"test3@gmail.com",
            "password":"123Mudar@",
            "registrationDate": new Date(Date.now())
            },{
            "name":"Linda",
            "cpf":"123.123.123-4",
            "email":"test4@gmail.com",
            "password":"123Mudar@",
            "registrationDate": new Date(Date.now())
            },{
            "name":"Fred",
            "cpf":"123.123.123-4",
            "email":"test5@gmail.com",
            "password":"123Mudar@",
            "registrationDate": new Date(Date.now())
            }
        ];
          
        UserMongooseModel.collection.insertMany(data, function (err, docs) { 
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully generated 5 sample documents!'});
        });
    
    }
}