import {Router} from 'express';
const router = Router();

import PhotoController from '../controllers/photo.controller';
const photoController = new PhotoController();
import multer from '../libs/multer';

router.route('/photos')
    .get(photoController.getPhotos)
    .post(multer.single('image'), photoController.createPhoto)

router.route('/photos/:id')
    .get(photoController.getPhoto)
    .delete(photoController.deletePhoto)
    .put(photoController.updatePhoto)



export default router;