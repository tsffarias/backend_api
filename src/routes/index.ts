import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';

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
            .post(this.userController.addNewUser);

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