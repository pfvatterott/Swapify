const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const imageMimeTypes = ['image/jpeg', 'image/png']
const db = require('../../models')

router.route("/")
  .get(itemsController.findAll)

  .post((req, res) => {
    const item = {
      name: req.body.name
    }
    saveImage(item, req.body.image)
    
  });

function saveImage(item, imageEncoded) {
  console.log(item)
  console.log('save cover function')
  if (imageEncoded == null) {
    return
  }
  const imageParsed = JSON.parse(imageEncoded)
  if (imageParsed != null && imageMimeTypes.includes(imageParsed.type)) {
    item.image = new Buffer.from(imageParsed.data, 'base64')
    item.imageType = imageParsed.type
    db.Items.create(item).then(dbModel => res.json(dbModel)).catch(err => res.status(422).json(err))
  }
}

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(itemsController.findByGoogleId)
  .put(itemsController.update)
  .delete(itemsController.remove);

router.get('search/:name', (req, res) => {
  console.log(res)
})

module.exports = router;
