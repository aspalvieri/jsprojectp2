exports.show = (req, res) => {
  // Check if our path is the root or a page
  const path = (req.path === '/') ? '/index' : req.path;

  // Render that path
  res.render(`pages${path}`, {
    title: "Home"
  });
};
  