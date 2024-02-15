// Middleware to check if user is logged in
const withAuth = (req, res, next) => {
    // Send user to login page if not logged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Export middleware
module.exports = withAuth;