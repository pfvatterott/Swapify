const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const multer = require('multer');
const upload = multer({dest: "client/public/images"})
const db = require("../../models")

router.route("/")
  .get(itemsController.findAll)

  .post(upload.single('productImage'), (req, res, next) => {
    console.log(req.file)
    const item = ({
      name: req.body.name,
      price: req.body.price
    })
    db.Items.create(item)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  });

// router.post("/", upload.single('productImage'), (req, res, next) => {
//     db.Items.create(req.body)
//     console.log(req.file)
// })



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
