import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { check } from 'express-validator/check';

export class Routes { 

    userController: UserController = new UserController();

    public routes(app: any): void { 
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send('Hello Good World!');
        }); 

        // ** User Routes ** //
        
        // Get all users
        app.route('/api/users')
            .get(this.userController.getUsers);

        // Create a new user
        app.route('/api/users')
            .post([
                // name must be at least 3 chars long and 30 chars max
                check('name').isLength({ min: 3, max: 30 }).trim(),
                // cpf must be at least 11 chars long and 14 chars max
                check('cpf').isLength({ min: 11, max: 14 }).trim(),
                // email must be an email
                check('email').isEmail().normalizeEmail().trim(),
                // password must be at least 6 chars long and 16 chars max
                check('password').isLength({ min: 6, max: 16 }).matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,16})/).trim()
        
            ], this.userController.addNewUser);

        // Get a specific user by ID
        app.route('/api/users/:userId')
            .get(this.userController.getUserById);

        // Get a specific user by cpf
        app.route('/api/getuserbycpf/:cpf')
            .get(this.userController.getUserByCpf);

        // Get a specific user by email
        app.route('/api/getuserbyemail/:email')
            .get(this.userController.getUserByEmail);

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