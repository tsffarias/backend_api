import { Request, Response } from 'express';
import { StudentController } from '../controllers/studentController';
import { UserController } from '../controllers/userController';

export class Routes { 

    studentController: StudentController = new StudentController();
    userController: UserController = new UserController();

    public routes(app: any): void { 
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send('Hello Good World!');
        }); 
        
        // ** Students Routes ** //
        
        // Get all students
        app.route('/api/students')
            .get(this.studentController.getStudents);

        // Create a new student
        app.route('/api/students')
            .post(this.studentController.addNewStudent);

        // get a specific student
        app.route('/api/students/:studentId')
            .get(this.studentController.getStudentById);

        // update a specific student
        app.route('/api/students/:studentId')
            .put(this.studentController.updateStudent);
        
        // delete a specific student
        app.route('/api/students/:studentId')
            .delete(this.studentController.deleteStudent);
        
        // generate student dummy data
        app.route('/api/dummy/students')
            .get(this.studentController.generateDummyData);

        // ** Users Routes ** //
        
        // Get all users
        app.route('/api/users')
            .get(this.userController.getUsers);

        // Create a new user
        app.route('/api/users')
            .post(this.userController.addNewUser);

        // Get a specific user
        app.route('/api/users/:userId')
            .get(this.userController.getUserById);

        // Update a specific user
        app.route('/api/users/:userId')
            .put(this.userController.updateUser);
        
        // Delete a specific user
        app.route('/api/users/:userId')
            .delete(this.userController.deleteUser);
        
        // generate user dummy data
        app.route('/api/dummy/users')
            .get(this.userController.generateUserDummyData);

    }
}