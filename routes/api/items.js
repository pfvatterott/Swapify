const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const multer = require('multer');
const upload = multer({dest: "uploads/"})

router.route("/")
  .get(itemsController.findAll)
  .post(itemsController.create);

// router.post("/", upload.single('productImage'), (req, res, next) => {
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
