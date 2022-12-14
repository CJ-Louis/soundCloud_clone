const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Song, Album, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateAlbum = [
    check('title')
      .notEmpty()
      .withMessage('Album title is required.'),
    handleValidationErrors
  ];

router.get('/', async(req, res, next) => {
    const albums = await Album.findAll({
        include:
        [{
            model: User,
            attributes: ['id', 'username']
        }],
    })

    return res.json({
        albums
    })
})

router.post('/', requireAuth, validateAlbum, async(req, res, next) => {
    const { title, description, imageUrl } = req.body;

    const {user} = req;


    const album = await Album.create({
        userId: user.id,
        title,
        description,
        imageUrl,
    })

    return res.json({
        album
      });
})

router.get('/current', requireAuth, restoreUser, async (req, res) => {
    const { user } = req;

    const userAlbums = await User.findOne({
      include: [{
          model: Album,
      }],
      where: {id: user.id}
  });

    if (userAlbums.Albums) {
      return res.json({
        albums: userAlbums.Albums
      });
    } else return res.json({albums: "You currently have no albums produced"});
  }
);

router.get('/:albumId', async(req, res, next) => {
    const id = req.params.albumId
    const album = await Album.findByPk(id)
    if (!album) {
        res.status(404).json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }
    return res.json({
        album
    })
})



router.put('/:albumId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { title, description, imageUrl } =req.body

    const id = req.params.albumId
    const album = await Album.findByPk(id)

    if (!album) {
        res.status(404).json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    if (album.userId !== user.id){
        throw new Error ("You do not have permission to edit this album's features")
    }
    if (title) album.title = title
    if (description) album.description = description
    if (imageUrl) album.imageUrl = imageUrl

    await album.save()

    return res.json({
        album
    })


})

router.delete('/:albumId', requireAuth, async (req, res, next) => {

    const albumId = req.params.albumId
    const album = await Album.findByPk(albumId)

    if (album){
        await album.destroy()
    } else {
        return res.status(404).json({
            message: `Album could not be found`,
            statusCode: 404
        })

    }

    deleted = await Album.findByPk(req.params.albumId)
    if (!deleted){
        return res.json({
            message: `Successfully deleted`,
            statusCode: 200
        });
    }


})

module.exports = router;
