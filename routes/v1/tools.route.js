const express = require('express');
const toolsController = require('../../controllers/tools.controller');
const { viewcount } = require('../../middlewires/viewcount.Js');
const router = express.Router();

router
  .route('/')
  .get(toolsController.getAllTools)
  .post(toolsController.saveAtool);

//router level middlewires
router
  .route('/:id')
  .get(viewcount, toolsController.getAtool)
  .patch(toolsController.updateAtool)
  .delete(toolsController.deleteAtool);

module.exports = router;
