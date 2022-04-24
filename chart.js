let myChart = document.getElementById("myChart").getContext("2d");

let pieChart = new Chart(myChart, {
    type: "bar", 
    data: {
        labels: ["Romania", "Bulgaria", "Latvia", "Croatia", "Poland"],
        datasets: [{
            label: "Most road deaths per Million Inhabitants in 2018",
            data: [
                96, 
                88, 
                78, 
                77, 
                76
            ],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)"
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 2,
        }]
    }, 
    options: {
        
    }
})