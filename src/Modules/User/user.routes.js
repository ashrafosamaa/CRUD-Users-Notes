import {Router} from 'express'
import * as uc from './user.controller.js'

const router = Router();

router.get('/getAllUsers', uc.getAllUser)

router.post('/signUp', uc.signUp)

router.post('/signIn', uc.signIn)

router.put('/updateUser', uc.updateUser)

router.delete('/deleteUser', uc.deleteUser)

router.get('/listUserA', uc.listUserA)

router.get('/listUsersTwenty', uc.listUsersTwenty)

router.get('/listOldestThreeUsers', uc.listOldestThreeUsers)

router.get('/listById', uc.listById)


export default router