

export const protectedRoute = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}