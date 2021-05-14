const router = require("express").Router();
const matchesController = require("../../controllers/matchesController");

// Matches with "/api/books"
router.route("/")
  .get(matchesController.findAll)
  .post(matchesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(matchesController.findUsersMatches)
  .put(matchesController.update)
  .delete(matchesController.remove);


router.get('search/:name', (req, res) => {
  console.log(res)
})

module.exports = router;
