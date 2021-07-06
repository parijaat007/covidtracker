import React, { useEffect, useState, response } from "react";
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js';
import numeral from 'numeral';

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  // data[casesType].forEach((date)=>{
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};
function LineGraph({ casesType, ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          //console.log(chartData);
          //buildChart(chartData);
        });
    };
    fetchData();
  }, [casesType]);

    

  return(
    <div className={props.className}>
      {/* <h1>Graph to be implemented</h1> */}
      {/* <Line data options/> -->Doesn't work 
      This won't work basically because there may 
      be an instance where the data doesn't exist */}
      {/* Optional chaining -> "?."
          We have written data && data.length>0 here basically*/}
      {data?.length > 0 && (
      <Line
        data={{
          datasets: [{
              label: 'Cases',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,192,0)',
              borderColor: 'rgba(47,79,79,1)',
              borderWidth: 2,
              data:data,
              pointRadius: 0,
            }],
        }}
        // Options actually not getting applied
      //   options={{
      //     legend:{
      //       display:false,
      //     },
      //     scales:{
      //       xAxes: [{
      //         type: 'time',
      //         time: {
      //           format:"MM/DD/YY"
      //         },
      //       }],
      //       yAxes:[
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //           ticks: {
      //             callback: function (value, index, values) {
      //               return numeral(value).format("0a");
      //             },
      //           },
      //         },
      //       ],
      //     },
      //   }}
        />
       )}
    </div>
  );
}

export default LineGraph;