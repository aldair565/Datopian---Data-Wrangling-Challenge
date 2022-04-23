const axios = require("axios");
const cheerio = require("cheerio");
const URL = "https://en.wikipedia.org/wiki/Road_safety_in_Europe";

async function webScraping(){
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);
    
    const tableData = $("table.wikitable").first().text();
    //console.log(tableData);
    
    const headers = [];

    const tableHeadData = $("table.wikitable tbody tr th").each((i, el) => {
        if (i <=11){
            headText = $(el).text().trim();
            headers.push(headText);
            //console.log(i, headText);
        }
    });
    console.log(headers.join(","));


    const tableRecordData = $("table.wikitable tbody tr").each((i, el) => {
        if (i <= 29){
            recordText = $(el).text().trim();
            //console.log(i, recordText);
        }
    });
    //console.log(tableRecordData);
}

webScraping();