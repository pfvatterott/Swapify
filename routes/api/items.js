const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const multer = require('multer');
const db = require("../../models")

// storage location and name for multer images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/public/images')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file if not right format
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

// creating upload file, limiting image size
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter
})


router.route("/")
  .get(itemsController.findAll)

  // posts a new item and saves image to public folder
  .post(upload.single('productImage'), (req, res, next) => {
    console.log(req.file)
    const item = ({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
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
