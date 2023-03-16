import {Router} from 'express'
import * as controller from '../controllers'
import {catchAsync} from '../utils/catchAsync'

const router: Router = Router()

router.route('/').get(catchAsync(controller.index))
router.route('/signin').post(catchAsync(controller.signin))
router.route('/users/:email').get(catchAsync(controller.getUserDetails)).put(catchAsync(controller.updateUser))

export default router
