// ApexGaugeChart.js
import Chart from "react-apexcharts";

const ApexGaugeChart = () => {
    const options = {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
              total: {
                show: true,
                label: "dB",
                formatter: function (w) {
                  return 40.189999 + "(g)";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          dashArray: 3,
          show: true,
          lineCap: "round",
          width: 7,
        },
      };
    
  const series = [40.189999];

  return (
    <div>
      <Chart options={options} series={series} type="radialBar" height={380} />
    </div>
  );
};

export default ApexGaugeChart;
