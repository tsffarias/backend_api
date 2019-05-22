// import { Request, Response } from 'express';
// import { UserController } from '../../controllers/userController';

// export class UserRoutes { 

//     userController: UserController = new UserController();

//     public userRoutes(app: any): void { 
//         app.route('/')
//             .get((req: Request, res: Response) => {            
//                 res.status(200).send('Hello Good World!');
//         });  
        
//         // Get all users
//         app.route('/api/users')
//             .get(this.userController.getUsers);

//         // Create a new user
//         app.route('/api/users')
//             .post(this.userController.addNewUser);

//         // Get a specific user
//         app.route('/api/users/:userId')
//             .get(this.userController.getUserById);

//         // Update a specific user
//         app.route('/api/users/:userId')
//             .put(this.userController.updateUser);
        
//         // Delete a specific user
//         app.route('/api/users/:userId')
//             .delete(this.userController.deleteUser);
        
//         // generate user dummy data
//         app.route('/api/users/dummy')
//             .get(this.userController.generateUserDummyData);

//     }
// }