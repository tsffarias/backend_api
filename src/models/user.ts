import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6, 
        max: 16,
        required: true
    },
    registrationDate: { 
        type: Date, 
        default: Date.now,
        required: true 
    }
});