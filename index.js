//Get modules
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const URL = "https://en.wikipedia.org/wiki/Road_safety_in_Europe";

//Main async function to do webscraping of page, return all data from table and store it within a CSV file
async function webScraping(){
    //Use axios to get page
    const response = await axios.get(URL);

    //Use cheerio load to convert to an object
    const $ = cheerio.load(response.data);
    
    //Declare headers array to store table headers
    const headers = [];

    //Function to get each tag and store the inner text to the headers array
    const tableHead = $("table.wikitable tbody tr th").each((i, el) => {
        if (i <=11){
            headText = $(el).text().trim().replace(/\n/g, "");
            headers.push(headText);
            //console.log(i, headText);
        }
    });

    //Remove Road Network Length column
    headers.splice(6, 1);

    //Remove columns after Total Road Deaths Per Million Inhabitants
    headers.splice(-3,3);

    //Add Year column
    headers.splice(1, 0, "Year");
    console.log(headers.join("|"));

    //Create csv file with headers delimited by "|" symbol
    fs.appendFile("European_Union_Road_Safety_Facts_and_Figures.csv", headers.join("|") + "\n", function(err){
        if (err) throw err;
        console.log("File created");
    });
    
    //Declare allRecords and record arrays to store data of each cell
    const allRecords = [];
    let record = [];

    //Function to get all the data and store the inner text from the table
    const tableData = $("table.wikitable tbody tr td").each((i, el) => {
        if (i <= 318){
            recordText = $(el).text().trim();
            record.push(recordText);
            
            //Condition which splits the array in 11 elements
            if (record.length == 11){
                record.splice(6, 1);
                record.splice(-2,2);

                // Add 2018 year
                record.splice(1, 0, "2018");

                //Writes the record array into the csv file
                fs.appendFile("European_Union_Road_Safety_Facts_and_Figures.csv", record.join("|") + "\n", function(err){
                    if (err) throw err;
                    console.log("New record added");
                });
                console.log(record.join("|"));

                //Appends the record array into allRecords and reset the array
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
