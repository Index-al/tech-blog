// Purpose: to handle the routes for the user model

const router = require("express").Router();
const { User } = require("../../models");

// Create a new user using the email and password and create a session
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log the user in using the email and password and create a session
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log('Error in logging in! ', err);
  }
});

// Logout user by destroying session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    console.log('Error in logging out! ', err);;
  }
});

// New user sign up logic
router.post("/signup", async (req, res) => {
  try {
      const userData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      });

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.json({ user: userData, message: "Signup successful!" });
      });
  } catch (err) {
      res.status(400).json(err); // Log the error to see what went wrong
      console.error('Signup error: ', err);
  }
});

module.exports = router;