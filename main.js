require("dotenv").config();
const fetch = require("node-fetch");
const execSync = require("child_process").execSync;
const wallpaper = require("wallpaper");
const puppeteer = require("puppeteer");

const key = process.env.api_key;
let url = "https://api.nasa.gov/planetary/apod";
let hit_url = url + `?api_key=${key}`;

async function fetcher() {
  try {
    let response = await fetch(hit_url);
    let data = await response.json();
    let img = data.hdurl ? data.hdurl : data.url;
    let imgext = data.hdurl ? ".jpg" : ".png";
    patt = `./Img/background${imgext}`;
    console.log(patt);
    let x = img.includes("gltf");
    if (x) {
      async function screen() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(img);
        await page.setViewport({
          width: 1920,
          height: 1080,
        });
        await page.screenshot({ path: patt });
        await browser.close();
      }
      screen();
    } else {
      execSync(`curl -o ${patt} ${img}`);
    }
    setBackground(patt);
  } catch (e) {
    console.log("There was some error -> ", e);
  }
}
async function setBackground(path) {
  let file = path;
  console.log(file);
  await wallpaper.set(file, (scale = "center"));
  await wallpaper.get();
}
fetcher();
