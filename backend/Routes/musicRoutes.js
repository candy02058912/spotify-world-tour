const express = require("express");
const router = express.Router();
const Music = require("../Models/musicModel");
const SpotifyApiCaller = require("../SpotifyAPICaller");

router.post("/", async function (req, res, next) {
  const q = req.query;
  try {
    // pass query/body args to model to get music
    const music = await SpotifyApiCaller.getClientCredentialsToken();
    // return res.json({music})
    return res.json({ music });
  } catch (err) {
    console.log("error");
    return next(err);
  }
});

router.get("/featured-playlist", async function (req, res, next) {
  try {
    const featuredPlaylists = await Music.getFeaturedPlaylist(req.body);
    return res.json({ featuredPlaylists });
  } catch (err) {
    return next(err);
  }
});

router.get("/playlist-by-category", async function (req, res, next) {
  try {
    const playlist = await Music.getPlaylistByCategory(req.body);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.get("/album-new-releases", async function (req, res, next) {
  try {
    const playlist = await Music.getAlbumNewReleases(req.body);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.get("/playlisttracks", async function (req, res, next) {
  try {
    const { playlistID } = req.body;
    console.log(req.body);
    const tracks = await SpotifyApiCaller.getPlaylistTracks(playlistID);
    return res.json({ tracks });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
