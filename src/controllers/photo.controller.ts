import {Request, Response} from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

export default class PhotoController{
    /**
     * createPhoto
     */
    public async createPhoto(req: Request, res: Response): Promise<Response> {
        const { title, description } = req.body;

        const newPhoto = {
            title: title,
            description: description,
            imagePath: req.file.path
        }
        
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.json({
            message: 'Photo successfully saved',
            photo
        });
    }

    /**
     * getPhotos
     */
    public async getPhotos(req: Request, res: Response): Promise<Response> {
        const photos = await Photo.find();
        return res.json(photos);
    }

    /**
     * getPhoto
     */
    public async getPhoto(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const photo = await Photo.findById(id);
        return res.json(photo);
    }

    /**
     * deletePhoto
     */
    public async deletePhoto(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const photo = await Photo.findByIdAndRemove(id);
        if (photo) {
            await fs.unlink(path.resolve(photo.imagePath));
        }
        return res.json({
            message: 'Photo deleted',
            photo
        });
    }

    /**
     * updatePhoto
     */
    public async updatePhoto(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description
        });

        return res.json({
            message: 'Successfully updated',
            updatedPhoto
        });
    }

}