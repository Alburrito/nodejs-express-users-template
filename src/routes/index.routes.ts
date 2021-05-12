import { Router } from 'express';

const router: Router = Router(); 

import { indexController }  from '../controllers/index.controller';

router.get('/', indexController.index);

router.get('/about', indexController.about);

export default router;