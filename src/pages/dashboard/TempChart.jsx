// ApexBarChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const ApexBarChart = () => {
  // Sample data for the bar chart
  const options = {
    chart: {
      type: 'bar',
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
      categories: ['2024-02-23 12:10', '2024-02-23 12:13', '2024-02-23 12:15'],
    },
  };

  const series = [
    {
      name: 'Temperature',
      data: [200, 180, 190],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  );
};

export default ApexBarChart;
