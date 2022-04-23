const axios = require("axios");
const cheerio = require("cheerio");
const URL = "https://en.wikipedia.org/wiki/Road_safety_in_Europe";

async function webScraping(){
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);
    
    const headers = [];

    const tableHead = $("table.wikitable tbody tr th").each((i, el) => {
        if (i <=11){
            headText = $(el).text().trim().replace(/\n/g, "");
            headers.push(headText);
            //console.log(i, headText);
        }
    });
    headers.splice(6, 1); //remove Road Network Length column
    headers.splice(-3,3); //remove columns after Total Road Deaths Per Million Inhabitants
    headers.splice(1, 0, "Year"); //add Year column
    console.log(headers.join("|"));
    
    const allRecords = [];
    let record = [];
    const tableData = $("table.wikitable tbody tr td").each((i, el) => {
        if (i <= 318){
            recordText = $(el).text().trim();
            record.push(recordText);
            if (record.length == 11){
                record.splice(6, 1); //remove Road Network Length column
                record.splice(-3,3); //remove columns after Total Road Deaths Per Million Inhabitants
                record.splice(1, 0, "2018"); // add 2018 year
                console.log(record.join("|"));
                allRecords.push(record);
                record = [];
            }
            //console.log(i, recordText);
        }
    });
    //console.log(tableRecordData);
    //allRecords.unshift(headers);
    //console.log(allRecords);
}

webScraping();