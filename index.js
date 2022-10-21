const express = require('express');
const axios = require('axios');
const app =express();

app.set('view engine', 'ejs');

const url = "https://api.data.gov.sg/v1/transport/carpark-availability";

app.get('/', (request,response) => {
axios({
    method: 'get',
    url: url,
}) 
.then( apidata => {
  
    const carparks = apidata.data
    const carpark = carparks.items[0].carpark_data;
    const smallLot = [], mediumLot = [], bigLot = [], largeLot = []
    
    carpark.forEach(cp => {
        //categorize carparks by sizes        
        if (cp.carpark_info[0].total_lots <100) {
            cp.carpark_info[0]['size'] = "small";
            smallLot.push(cp)
        } else 
        if (cp.carpark_info[0].total_lots <300 && cp.carpark_info[0].total_lots >100) {
            cp.carpark_info[0]['size'] = "medium";
            mediumLot.push(cp)
        } else 
        if (cp.carpark_info[0].total_lots <400 && cp.carpark_info[0].total_lots >300) {
            cp.carpark_info[0]['size'] = "big";
            bigLot.push(cp)
        } else
        if (cp.carpark_info[0].total_lots > 400) {
            cp.carpark_info[0]['size'] = "large";
            largeLot.push(cp)
        }
    })
        // mapping for small carpark available lot numbers
        const smallLots = smallLot.map(lot => lot.carpark_info[0].lots_available )

        // filter for finding carparks that have min or max number of lots
        var smallMin = smallLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.min(...smallLots)
        ))       
        var smallMax = smallLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.max(...smallLots )
        )) 
        // list out all carparks with minimum/maximum lots
        var smallCPMin = [], smallCPMax = [];
        for (let i=0; i<smallMin.length;i++) {
            smallCPMin.push(smallMin[i].carpark_number)
        }
        for (let i=0; i<smallMax.length;i++) {
            smallCPMax.push(smallMax[i].carpark_number)
        }
         
        // medium lots
        const mediumLots = mediumLot.map(lot => lot.carpark_info[0].lots_available )
        var mediumMin = mediumLot.filter(
            lot => (// console.log(carpark)
                lot.carpark_info[0].lots_available == Math.min(...mediumLots )
        ))       
        var mediumMax = mediumLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.max(...mediumLots )
        )) 
        var mediumCPMin = [], mediumCPMax = [];
        for (let i=0; i<mediumMin.length;i++) {
            mediumCPMin.push(mediumMin[i].carpark_number)
        }
        for (let i=0; i<mediumMax.length;i++) {
            mediumCPMax.push(mediumMax[i].carpark_number)
        }
    
        //big lots
        const bigLots = bigLot.map(lot => lot.carpark_info[0].lots_available )
        var bigMin = bigLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.min(...bigLots )
        ))       
        var bigMax = bigLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.max(...bigLots )
        )) 
        var bigCPMin = [], bigCPMax = [];
        for (let i=0; i<bigMin.length;i++) {
            bigCPMin.push(bigMin[i].carpark_number)
        }
        for (let i=0; i<bigMax.length;i++) {
            bigCPMax.push(bigMax[i].carpark_number)
        
        }
 
        //large lots
        const largeLots = largeLot.map(lot => lot.carpark_info[0].lots_available )
        var largeMin = largeLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.min(...largeLots )
        ))       
        var largeMax = largeLot.filter(
            lot => (
                lot.carpark_info[0].lots_available == Math.max(...largeLots )
        )) 
        var largeCPMin = [], largeCPMax = [];
        for (let i=0; i<largeMin.length;i++) {
            largeCPMin.push(largeMin[i].carpark_number)
        }
        for (let i=0; i<largeMax.length;i++) {
            largeCPMax.push(largeMax[i].carpark_number)
        } 

        const tab = [
            {
                size: 'small',
                lot: Math.min(...smallLots),
                carparkNum: smallCPMin
            },
            {
                size: 'small',
                lot: Math.max(...smallLots),
                carparkNum: smallCPMax
            },
            {
                size: 'medium',
                lot: Math.min(...mediumLots),
                carparkNum: mediumCPMin
            },
            {
                size: 'medium',
                lot: Math.max(...mediumLots),
                carparkNum: mediumCPMax
            },
            {
                size: 'big',
                lot: Math.min(...bigLots),
                carparkNum: bigCPMin
            }, 
            {
                size: 'big',
                lot: Math.max(...bigLots),
                carparkNum: bigCPMax
            },
            {
                size: 'large',
                lot: Math.min(...largeLots),
                carparkNum: largeCPMin
            },
            {
                size: 'large',
                lot: Math.max(...largeLots),
                carparkNum: largeCPMax
            }
                    
        ]
    
    response.render('pages/index', {
        cps: tab
    } )
})
});

app.listen(3002);



// response.sendFile(path.join(__dirname, 'index.html'));
// function show(data) {
//     const carpark = data.items[0].carpark_data;
//     const smallLot = [], mediumLot = [], bigLot = [], largeLot = []
    
//     carpark.forEach(cp => {
//         //categorize carparks by sizes        
//         if (cp.carpark_info[0].total_lots <100) {
//             cp.carpark_info[0]['size'] = "small";
//             smallLot.push(cp)
//         } else 
//         if (cp.carpark_info[0].total_lots <300 && cp.carpark_info[0].total_lots >100) {
//             cp.carpark_info[0]['size'] = "medium";
//             mediumLot.push(cp)
//         } else 
//         if (cp.carpark_info[0].total_lots <400 && cp.carpark_info[0].total_lots >300) {
//             cp.carpark_info[0]['size'] = "big";
//             bigLot.push(cp)
//         } else
//         if (cp.carpark_info[0].total_lots > 400) {
//             cp.carpark_info[0]['size'] = "large";
//             largeLot.push(cp)
//         }
//     })
//         // mapping for small carpark available lot numbers
//         const smallLots = smallLot.map(lot => lot.carpark_info[0].lots_available )

//         // filter for finding carparks that have min or max number of lots
//         var smallMin = smallLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.min(...smallLots)
//         ))       
//         var smallMax = smallLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.max(...smallLots )
//         )) 
//         // list out all carparks with minimum/maximum lots
//         var smallCPMin = [], smallCPMax = [];
//         for (let i=0; i<smallMin.length;i++) {
//             smallCPMin.push(smallMin[i].carpark_number)
//         }
//         for (let i=0; i<smallMax.length;i++) {
//             smallCPMax.push(smallMax[i].carpark_number)
//         }
//         console.log(smallCPMin);
//         // medium lots
//         const mediumLots = mediumLot.map(lot => lot.carpark_info[0].lots_available )
//         var mediumMin = mediumLot.filter(
//             lot => (// console.log(carpark)
//                 lot.carpark_info[0].lots_available == Math.min(...mediumLots )
//         ))       
//         var mediumMax = mediumLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.max(...mediumLots )
//         )) 
//         var mediumCPMin = [], mediumCPMax = [];
//         for (let i=0; i<mediumMin.length;i++) {
//             mediumCPMin.push(mediumMin[i].carpark_number)
//         }
//         for (let i=0; i<mediumMax.length;i++) {
//             mediumCPMax.push(mediumMax[i].carpark_number)
//         }
    
//         //big lots
//         const bigLots = bigLot.map(lot => lot.carpark_info[0].lots_available )
//         var bigMin = bigLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.min(...bigLots )
//         ))       
//         var bigMax = bigLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.max(...bigLots )
//         )) 
//         var bigCPMin = [], bigCPMax = [];
//         for (let i=0; i<bigMin.length;i++) {
//             bigCPMin.push(bigMin[i].carpark_number)
//         }
//         for (let i=0; i<bigMax.length;i++) {
//             bigCPMax.push(bigMax[i].carpark_number)
        
//         }
//         console.log(bigCPMin);
//         console.log(bigCPMax);
//         //large lots
//         const largeLots = largeLot.map(lot => lot.carpark_info[0].lots_available )
//         var largeMin = largeLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.min(...largeLots )
//         ))       
//         var largeMax = largeLot.filter(
//             lot => (
//                 lot.carpark_info[0].lots_available == Math.max(...largeLots )
//         )) 
//         var largeCPMin = [], largeCPMax = [];
//         for (let i=0; i<largeMin.length;i++) {
//             largeCPMin.push(largeMin[i].carpark_number)
//         }
//         for (let i=0; i<largeMax.length;i++) {
//             largeCPMax.push(largeMax[i].carpark_number)
//         } 

//         const tab = {
//             size: 'small',
//             lot: Math.max(...smallLots),
//             carparkNum: smallCPMin
//         }
//     return tab;
     // simple create table
    
        // `<tr>
        //     <th> Carpark Category </th>
        //     <th> Highest/Lowest Available Lots </th>
        //     <th> Carpark Numbers </th>     
        // </tr>
        // <tr> 
        //     <td rowspan="2"> Small </td> 
        //     <td> ${Math.max(...smallLots)}</td>
        //     <td>${smallCPMin}</td>
        // </tr>
        // <tr>
        //     <td> ${Math.min(...smallLots)}</td>
        //     <td>${smallCPMax}</td>
        // </tr>
        // <tr> 
        //     <td rowspan="2"> Medium </td> 
        //     <td> ${Math.max(...mediumLots)}</td>
        //     <td>${mediumCPMin}</td>
        // </tr>
        // <tr>
        //     <td> ${Math.min(...mediumLots)}</td>
        //     <td>${mediumCPMax}</td>
        // </tr>
        // <tr> 
        //     <td rowspan="2"> Big </td> 
        //     <td> ${Math.max(...bigLots)}</td>
        //     <td>${bigCPMin}</td>
        // </tr>
        // <tr>
        //     <td> ${Math.min(...bigLots)}</td>
        //     <td>${bigCPMax}</td>
        // </tr>
        // <tr> 
        //     <td rowspan="2"> Large </td> 
        //     <td> ${Math.max(...largeLots)}</td>
        //     <td>${largeCPMin}</td>
        // </tr>
        // <tr>
        //     <td> ${Math.min(...largeLots)}</td>
        //     <td>${largeCPMax}</td>
        // </tr>`;

    // document.getElementById("carpark").textContent = tab;
    // var element = $($(tab).attr("carpark"))[0] 
// function cpTable() {
//     if ($("#carpark tbody").length == 0) {
//         $("#carpark").append("<tbody></tbody>");
//     }
//     $("#carpark tbody").append(
//     "<tr>" +
//     "<td> Small </td> " +
//     "<td> $ {Math.max(...smallLots)}</td>" +
//     "<td>${smallCPMin}</td>" +
//     "</tr>"
//     );
// }
// $(document).ready(function() {
//     cpTable();
//  });
