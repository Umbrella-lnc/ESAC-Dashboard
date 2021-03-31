const User = require('../models/User')
const dotenv = require('dotenv')

dotenv.config()
const secretOrKey = process.env.secretOrKey

// @route POST api/usersManagementController/toggleVerifiedStatus
// @desc Register a user in the database
// @access Admin
const toggleVerifiedStatus = async (req, res) => {
  //Look into creating super admins
  if (req.user.accessLevel != 'administrator') {
    return res.status(401).json({
      unauthorized: 'Need administrator privileges to verify users!',
    })
  }

<<<<<<< HEAD
  // Make sure the user actually exists in the database
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).json({ doesnotexist: 'User does not exist!' })
    } else {
      //Change to toggle functionality later
      user.active = !user.active
      console.log(user)
      //Look into using update to flip state without reading prev. state
      user
        .save()
        .then(() => {
          res.status(200).json({ success: 'Toggled user access!' })
        })
        .catch((err) =>
          res.status(500).json({
            failure: 'Internal error, could not update db.',
          })
        )
    }
  })
}
=======
    // Make sure the user actually exists in the database
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res
                .status(400)
                .json({ doesnotexist: "User does not exist!" });
        } else {
            //Change to toggle functionality later
            user.active = !user.active;
            //Look into using update to flip state without reading prev. state
            user.save()
                .then(() => {
                    res.status(200).json({ success: "Toggled user access!" });
                    console.log(
                        "Toggled user " +
                            user.email +
                            " to active: " +
                            user.active
                    );
                })
                .catch((err) =>
                    res.status(500).json({
                        failure: "Internal error, could not update db.",
                    })
                );
        }
    });
};
>>>>>>> 21ed4acf836354af501d8ecbb2078abf76099e40

// @route POST api/usersManagementController/deleteUser
// @desc Delete a user from the database
// @access Admin
const deleteUser = async (req, res) => {
  // Verify that the user has access level "administrator"
  if (req.user.accessLevel != 'administrator') {
    return res.status(400).json({
      accessLevel: 'Need administrator privileges to delete user!',
    })
  }

  // Make sure the user actually exists in the database
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found!' })
    } else {
      User.findOneAndRemove({ email: req.body.email }).then((email) => {
        res.json({ success: true })
      })
    }
  })
}

// @route GET api/usersManagementController/listUsers
// @desc Return all users in the database
// @access Admin
const listUsers = async (req, res) => {
<<<<<<< HEAD
  // Verify that the user has access level "administrator"
  if (req.user.accessLevel != 'administrator') {
    return res.status(400).json({
      accessLevel: 'Need administrator privileges to delete user!',
    })
  }

  // Make sure the user actually exists in the database
  User.find()
    .then((users) => {
      return res.json(users)
    })
    .catch((error) => {
      return res.send(error)
    })
}

exports.toggleVerifiedStatus = toggleVerifiedStatus
exports.deleteUser = deleteUser
exports.listUsers = listUsers
=======
    // Verify that the user has access level "administrator"
    if (req.user.accessLevel != "administrator") {
        return res.status(400).json({
            accessLevel: "Need administrator privileges to delete user!",
        });
    }

    // Make sure the user actually exists in the database
    User.find()
        .then((users) => {
            return res.json(users);
        })
        .catch((error) => {
            return res.send(error);
        });
};

const getAllNamesWithID = async (req, res) => {
    User.find()
        .then((users) => {
            let usersMap = {};
            users.forEach((user) => {
                usersMap[user._id] = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
            });

            return res.json(usersMap);
        })
        .catch((error) => {
            return res.send(error);
        });
};

exports.toggleVerifiedStatus = toggleVerifiedStatus;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;
exports.getAllNamesWithID = getAllNamesWithID;
>>>>>>> 21ed4acf836354af501d8ecbb2078abf76099e40
