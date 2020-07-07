const db = require("../models");

module.exports = {

// CREATE
  
  addTask: function (req, res) {
    db.Task
    .create(req.body.task)
    .then(dbAddedTask => {
        console.log("dbAddedTask: ", dbAddedTask); 
        dbAddedTask.users.addToSet(req.body.userId);
            dbAddedTask.save(err => {
               if (err) console.log(err);
               console.log('Save successful');
            });
        res.json(dbAddedTask);
    })
    .catch((err) => res.status(422).json(err));
  },


// READ

//   findAll: function (req, res) {
//     db.Task.find({})
//       .then((dbResources) => res.json(dbResources))
//       .catch((err) => res.status(422).json(err));
//   },

//   findById: function (req, res) {
//     db.Task.findById(req.params.taskId)
//       .sort({})
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },

  findUsersTasks: function (req, res) {
    console.log("controller.findUsersTasks: ", req.params.userId);
    db.Task.find(
        { users: {$in: [req.params.userId]}} // get tasks that have user id in tasks's users array
        ) // find the user by _id
        .then((dbModel) => {
            console.log("\n.findUsersTasks->return: ", dbModel);
            res.json(dbModel)
        })
        .catch((err) => res.status(422).json(err));
  },

// UPDATE


    updateTask: function(req, res) {
        db.Task.findByIdAndUpdate(req.params.taskId,{
            title: req.body.taskData.title,
            description: req.body.taskData.description,
        },
        { useFindAndModify: false, new: true })
        .then(dbTask => {
            console.log("Task " + dbTask._id + " updated successfully!");
            res.json(dbTask);
        })
        .catch((err) => res.status(422).json(err));
    },

// DELETE

    deleteTask: function(req, res) {
        db.Resource.findByIdAndDelete(req.params.taskId)
        .then(dbTask => res.json(dbTask))
        .catch(err => res.status(422).json(err));
    }

};
