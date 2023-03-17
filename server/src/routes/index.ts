import {Router} from 'express'
import * as controller from '../controllers'
import {catchAsync} from '../utils/catchAsync'
import {isAuthenticated} from '../utils/isAuthenticated'

const router: Router = Router()

router.route('/').get(catchAsync(controller.index))
router.route('/signin').post(catchAsync(controller.signin))
router
  .route('/users/:email')
  .get(isAuthenticated, catchAsync(controller.getUserDetails))
  .put(isAuthenticated, catchAsync(controller.updateUser))

export default router
