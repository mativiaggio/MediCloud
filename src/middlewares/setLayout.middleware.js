export function setLayout(req, res, next) {
  if (req.path.startsWith("/admin")) {
    res.locals.layout = "admin/main";
  } else {
    res.locals.layout = "client/main";
  }
  next();
}
