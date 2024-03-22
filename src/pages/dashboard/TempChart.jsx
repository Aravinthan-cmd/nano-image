import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ApexLineChart = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var url;
      try {
        url = "https://3lions.xyma.live/sensor/getTemperature";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setData(datafetchVal);
      } catch (error) {
        console.log("error", error);
      }
    };
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log("chart", data);

  useEffect(() => {
    let temp = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
      temp[i] = data[i]?.temperature;
      time[i] = data[i]?.updatedAt;
    }
    setTime(time);
    setChart(temp);
    console.log("val", chart);
  }, [data]);

  const options = {
    chart: {
      type: "line",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: time,
    },
    tooltip: {
      theme: "dark",
      style: {
        background: "#000000",
        color: "#ffffff",
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "Value: ";
          },
        },
        formatter: function (value) {
          return value;
        },
      },
      marker: {
        show: true,
      },
    },
  };

  const series = [
    {
      name: "Temperature",
      data: chart,
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={290} />
    </div>
  );
};

export default ApexLineChart;

// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";

// const ApexLineChart = () => {
//   const [data, setData] = useState([]);
//   const [time, setTime] = useState([]);
//   const [temperature, setTemperature] = useState([]);
//   const [humidity, setHumidity] = useState([]);
//   const [pressure, setPressure] = useState([]);
//   const [light, setLight] = useState([]);

//   useEffect(() => {
//     const generateRandomData = () => {
//       const tempData = [];
//       const humidityData = [];
//       const pressureData = [];
//       const lightData = [];
//       const timeData = [];

//       for (let i = 0; i < 10; i++) {
//         tempData.push(Math.floor(Math.random() * (30 - 20 + 1)) + 20); // Random temperature between 20 and 30
//         humidityData.push(Math.floor(Math.random() * (80 - 50 + 1)) + 50); // Random humidity between 50 and 80
//         pressureData.push(Math.floor(Math.random() * (1015 - 1005 + 1)) + 1005); // Random pressure between 1005 and 1015
//         lightData.push(Math.floor(Math.random() * (1000 - 500 + 1)) + 500); // Random light between 500 and 1000
//         timeData.push(`2024-03-21T12:${i < 10 ? "0" + i : i}:00Z`);
//       }

//       setTemperature(tempData);
//       setHumidity(humidityData);
//       setPressure(pressureData);
//       setLight(lightData);
//       setTime(timeData);
//     };

//     generateRandomData();
//   }, []);

//   const options = {
//     chart: {
//       type: "line",
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: time,
//     },
//     tooltip: {
//       theme: "dark",
//       style: {
//         background: "#000000",
//         color: "#ffffff",
//       },
//       y: {
//         title: {
//           formatter: function (seriesName) {
//             return "Value: ";
//           },
//         },
//         formatter: function (value) {
//           return value;
//         },
//       },
//       marker: {
//         show: true,
//       },
//     },
//   };

//   const series = [
//     {
//       name: "Pipe 1",
//       data: temperature,
//     },
//     {
//       name: "Pipe 2",
//       data: humidity,
//     },
//     {
//       name: "Pipe 3",
//       data: pressure,
//     },
//     {
//       name: "Pipe 4",
//       data: light,
//     },
//   ];

//   return (
//     <div>
//       <Chart options={options} series={series} type="line" height={290} />
//     </div>
//   );
// };

// export default ApexLineChart;
