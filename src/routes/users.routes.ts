import { Router } from 'express';

const router: Router = Router(); 

import { usersController }  from '../controllers/users.controller';

router.get('/users/signup', usersController.signUpView);
router.post('/users/signup', usersController.signUp);

router.get('/users/signin', usersController.signInView);
router.post('/users/signin', usersController.signIn);

router.get('/users/logout', usersController.logout);

export default router;