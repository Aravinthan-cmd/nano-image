import {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';

const ApexLineChart = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState([])
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

  console.log('chart', data);

  useEffect(() => {
    let temp = [];
    let time = [];
  for (let i = 0; i < data.length; i++) {
    temp[i] = data[i]?.temperature;
    time[i] = data[i]?.updatedAt;
  }
  setTime(time);
  setChart(temp);
  console.log('val', chart);
  }, [data]);

  const options = {
    chart: {
      type: 'line',
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
      name: 'Temperature',
      data: chart,
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={320} />
    </div>
  );
};

export default ApexLineChart;
