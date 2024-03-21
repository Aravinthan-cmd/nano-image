import React from 'react'
import "../ports/ports.scss";
import density from '../../assets/images/density copy.png';
import { useEffect, useState } from "react";
import temperature from '../../assets/images/thermometer copy.png';
import visco from '../../assets/images/water copy.png';
import dtn from '../../assets/images/lab.png';
import { RadioButton, RadioGroup } from "react-radio-buttons";
import ReactApexChart from 'react-apexcharts';
import { ContentPasteOffSharp } from '@mui/icons-material';

const Ports = () => {
    const [data, setData] = useState([]);
    const [dataVibration, setDataVibration] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [sendData, setSendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var url;
      try {
        url = 'https://3lions.xyma.live/sensor/getsensor';
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setData(datafetchVal);
      } catch (error) {
        console.log("error", error)
      }
    };
    const interval = setInterval(() => {
      fetchData();
      fetchAllData();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchAllData = async () => {
    var url;
    try {
      url = 'https://3lions.xyma.live/sensor/getallSensor';
      console.log('url', url);
      const response = await fetch(url);
      const dataVal = await response.json();
      setAllData(dataVal);
    } catch (error) {
      console.log("error",error);
    }
  };

  let temp = [];
  let den = [];
  let vis = [];
  let dt = [];
  let time = [];

  for (let i = 0; i < alldata.length; i++) {
    temp[i] = alldata[i]?.temperature;
    den[i] = alldata[i]?.density;
    vis[i] = alldata[i]?.viscosity;
    dt[i] = alldata[i]?.dtn;
    time[i] = alldata[i]?.updatedAt;
  }

  const chartOptions = {
    grid: {
      show: false,
    },
    series: [
      {
        name: 'temp',
        data: sendData,
        stroke: {
          curve: 'smooth',
          dashArray: [5, 5], // Set the dash pattern
        },
      },
    ],
    chart: {
      height: 500,
      type: 'line',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: time,
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    tooltip: {
      theme: "dark", // Set the theme to dark
      style: {
        background: "#000000", // Set the background color to black
        color: "#ffffff", // Set the text color to white
      },
      y: {
        title: {
          formatter: function(seriesName) {
            return 'Value: ';
          },
        },
        formatter: function(value) {
          return value;
        },
      },
      marker: {
        show: true,
      },
    },
  };

  const handleOptionChange = (value) => {
    console.log("val",value);
    switch (value) {
      case 'Density':
        setSendData(den);
        break;
      case 'Viscosity':
        setSendData(vis);
        break;
      case 'Temperature':
        setSendData(temp);
        break;
      case 'Dtn':
        setSendData(dt);
        break;
      default:
        setSendData(temp);
        break;
    }
  };

  return (
    <div className='ports'>
<div className="boxes">
        <div className="density box">
          <div className="left">
            <img src={density} alt="" style={{ width: '80px' }} />
          </div>
          <div className="right">
            <h1>Density</h1>
            <span>{data[0]?.density} kg/m³</span>
          </div>
        </div>
        <div className="viscosity box">
          <div className="left">
            <img src={visco} alt="" style={{ width: '80px' }} />
          </div>
          <div className="right">
            <h1>Viscosity</h1>
            <span>{data[0]?.viscosity} cSt</span>
          </div>
        </div>
        <div className="temperature box">
          <div className="left">
            <img src={temperature} alt="" style={{ width: '80px' }} />
          </div>
          <div className="right">
            <h1>Temperature</h1>
            <span>{data[0]?.temperature} °C</span>
          </div>
        </div>
        <div className="dtn box">
          <div className="left">
            <img src={dtn} alt="" style={{ width: '80px' }} />
          </div>
          <div className="right">
            <h1>TDN</h1>
            <span>{data[0]?.dtn}</span>
          </div>
        </div>
      </div>

      <div className="graph_boxes">
        <div className="list">
          <RadioGroup onChange={handleOptionChange} horizontal>
            <RadioButton value="Density" rootColor="#2196F3" pointColor="#2196F3">
              Density
            </RadioButton>
            <RadioButton value="Viscosity" rootColor="#2196F3" pointColor="#2196F3">
              Viscosity
            </RadioButton>
            <RadioButton value="Temperature" rootColor="#2196F3" pointColor="#2196F3">
              Temperature
            </RadioButton>
            <RadioButton value="Dtn" rootColor="#2196F3" pointColor="#2196F3">
              TDN
            </RadioButton>
          </RadioGroup>
        </div>
        <ReactApexChart options={chartOptions} series={chartOptions.series} type='line' height={550} />
      </div>

    </div>
  )
}

export default Ports