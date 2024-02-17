// Purpose: This file is the entry point for the application. It sets up the server and the connection to the database. It also sets up the session and the handlebars engine. It also sets up the routes for the application.

// Dependencies
const path = require("path"); // Path module
const express = require("express"); // Express module
const session = require("express-session"); // Express session module
const exphbs = require("express-handlebars"); // Express handlebars module
const routes = require("./controllers"); // Routes module
const helpers = require("./utils/helpers"); // Helpers module
const sequelize = require("./config/connection"); // Connection module
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Session store module
const userRoutes = require("./controllers/api/userRoutes"); // User routes module
const postRoutes = require('./controllers/postController'); // Post routes module
const commentRoutes = require('./controllers/commentController'); // Comment routes module


// Variables
const app = express();
const PORT = process.env.PORT || 3001; 
const hbs = exphbs.create({ helpers });
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));

// Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Express
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`\nNow listening at http://localhost:${PORT}\n`)
  );
});
