import fs from "fs";
import puppeteer from "puppeteer";
import inquirer from "inquirer";


const scrapping = async (pokeType) => {
 const BASE_URL = "https://pokemondb.net/pokedex/all"

 const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
 })
 const page = await browser.newPage();
 await page.goto(BASE_URL);
 await page.waitForTimeout(8000);
 await page.waitForSelector("select #filter-pkmn-type")
 await page.select("select #filter-pkmn-type", pokeType);
 await page.waitForTimeout(3000);
 await page.click(page.$x("//div[contains(., 'HP')]"));
 await page.waitForTimeout(2000);
 await page.click(page.$x("//div[contains(., 'HP')]"));
 await page.waitForTimeout(2000);

 const pokemonList = await page.$$eval("tr:not(.hidden)", (nodes) =>
 nodes.map((n) => ({
   name: n.querySelector(".cell-name a.ent-name")?.innerText,
   pokedexNum: n.querySelector(".infocard-cell-data")?.innerText,
   baseHP: n.querySelector("tr td :nth-child(3)")?.innerText, 
   baseAttack: n.querySelector("tr td :nth-child(4)")?.innerText, 
   baseDefense: n.querySelector("tr td :nth-child(5)")?.innerText, 
 }))
);


const pokemonString = JSON.stringify(pokemonList);

fs.writeFile(
  pokeType.toLowerCase().json,
  pokemonList,
  () => {
    console.log("PokeList ready!");
  }
);

await browser.close();
};




inquirer.prompt([
    {name: "pokeType",
    type: "list",
    message: "Choose the Pokemon Type you want to look for.",
    choices: ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "steel", "dragon", "dark", "fairy"]},
]).then((answers) => {
    let pokeType = answers.pokeType
    scrapping(pokeType);
})