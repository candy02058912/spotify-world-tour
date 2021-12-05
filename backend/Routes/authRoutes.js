const express = require("express");
const router = express.Router();
const passport = require("passport");
const SpotifyApiCaller = require("../SpotifyAPICaller");

router.get("/client-credentials", async function (req, res) {
  try {
    const clientCredentialsToken =
      await SpotifyApiCaller.getClientCredentialsToken();
    return res.json({ clientCredentialsToken });
  } catch (err) {
    return next(err);
  }
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    // let user = req.user;
    // console.log("req.session");
    // console.log(req.session);
    // console.log(req.user);
    // req.session.accessToken
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken - req.user.refreshToken;
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  console.log("logged out");
  req.session.destroy();
  req.logout();
});

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    showDialog: true,
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/login/failed",
  }),
  function (req, res) {
    res.redirect("http://localhost:3001/");
  }
);

module.exports = router;
