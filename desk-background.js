require("dotenv").config();
const fetch = require("node-fetch");
const execSync = require("child_process").execSync;
const wallpaper = require("wallpaper");

const key = process.env.api_key;
let url = "https://api.nasa.gov/planetary/apod";
let hit_url = url + `?api_key=${key}`;

async function fetcher() {
  let response = await fetch(hit_url);
  let data = await response.json();
  let img = data.hdurl;
  execSync(`curl -o ./Img/background.jpg ${img}`);
  setBackground();
}
async function setBackground() {
  let path = "./Img/background.jpg";
  await wallpaper.set(path, (scale = "center"));
  await wallpaper.get();
}
fetcher();
