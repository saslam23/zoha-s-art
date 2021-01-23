const express = require('express');
const Photo = require('../models/photosModel');
const router = express.Router();

router.get('/upload', async (req, res) =>{
    const photoInfo = await Photo.find({});

    if(photoInfo){
        res.status(201).json(photoInfo);
    } else{
        res.status(500).json({message: 'Unable to retrieve photos'})
    }
});

router.post('/upload', (req, res) =>{
    if(req.files === null){
        res.status(400).json({msg: 'file not recognized'});
    }

    const file = req.files.photo;
    const caption = req.body.caption;
    const type = req.body.type;
    const date = req.body.date;
    const altText = req.body.altText;

    file.mv(`${__dirname, './'}/minimal-frontend/public/assets/${file.name}`, err =>{
        if(err){
            console.error(err);
            return res.status(500).json({msg:'image path not valid'});
        }
        const image = `/assets/${file.name}`;
      

        const newPhoto = new Photo ({
        image,
        caption,
        type,
        altText,
        date

        });

        const photo = newPhoto.save();

        if(photo){
            res.json({message: 'photo successfully uploaded!'})
        }
       
    });

    
});

router.delete('/:id', async (req,res) =>{
    const photoId = req.params.id;

    const photo = await Photo.findById(photoId);

    if(photo){
        photo.remove();
        res.status(200).json({data: photo, message:'photo successfully deleted'})
    };
});

module.exports = router;