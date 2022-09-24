const { ObjectID, ObjectId } = require('bson');
const { getDb } = require('../utils/dbConnect');

module.exports.getAllTools = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();
    const allTools = await db
      .collection('tools')
      .find()
      .skip(+page * limit)
      .limit(parseInt(limit))
      .project({ _id: 0, name: 1 })
      .toArray();

    if (!allTools.length) {
      return res.status(400).send({
        success: false,
        error: 'no tools found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'successfully found the tools',
      data: allTools,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.saveAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection('tools').insertOne(tool);
    if (!result.insertedId) {
      return res.status(400).send({
        success: false,
        error: 'something Went wrong',
      });
    }
    res.status(200).send({
      success: true,
      message: 'successfully post a tool',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.getAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: 'not a valid tool id',
      });
    }
    const aTool = await db.collection('tools').findOne({ _id: ObjectID(id) });
    if (!aTool) {
      return res.status(400).send({
        success: false,
        error: 'no tool found with id',
      });
    }
    res.status(200).send({
      success: true,
      message: 'successfully get a tool with id',
      data: aTool,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.updateAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updatedTool = await db
      .collection('tools')
      .updateOne({ _id: ObjectId(id) }, { $set: req.body });
    if (!updatedTool.modifiedCount && !updatedTool.matchedCount) {
      res.status(400).send({
        success: false,
        error: 'could not find the tool ',
      });
    } else if (!updatedTool.modifiedCount) {
      res.status(400).send({
        success: false,
        error: 'could not modify the tool ',
      });
    }
    res.status(200).send({
      success: true,
      message: 'successfully updated a tool with id',
    });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const result = await db
      .collection('tools')
      .deleteOne({ _id: ObjectID(id) });
    if (!result.deletedCount) {
      res.status(400).send({
        success: false,
        error: 'couldnot deleted a tool with id',
      });
    }
    res.status(200).send({
      success: true,
      message: 'successfully deleted a tool with id',
    });
  } catch (error) {
    next(error);
  }
};
