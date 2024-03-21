import React, { useEffect, useState } from "react";
import "../report/report.scss";
import report_logo from "../../assets/images/7079771_3324619.svg";
import report_logo_nano from "../../assets/images/1311213_313.svg";
import * as XLSX from "xlsx";

const Report = () => {
  const [data, setData] = useState([]);
  const [nanoData, setNanoData] = useState([]);
  const [selectXyma, setSelectXyma] = useState('density');
  const [selectNano, setSelectNano] = useState('temperaure');

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
      fetchNanoData(selectNano);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  },[selectNano]);

  const fetchAllData = async () => {
    var urlxyma;
    try {
      urlxyma = "https://3lions.xyma.live/sensor/getallSensor";
      console.log("urlxyma", urlxyma);
      const response = await fetch(urlxyma);
      const dataVal = await response.json();
      setData(dataVal);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchNanoData = async () => {
    var url;
    try {
        url = `https://3lions.xyma.live/sensor/getNanoGraph?graphName=${selectNano}`;
      console.log("url", url);
      const response = await fetch(url);
      const dataVal = await response.json();
      setNanoData(dataVal);
    } catch (error) {
      console.log("error", error);
    }
  };

  var density = [];
  var temperature = [];
  var viscosity = [];
  var tbn = [];
  var timexyma = [];
  
  for (let index = 0; index < data.length; index++) {
    density[index] = data[index].density;
    temperature[index] = data[index].temperature;
    viscosity[index] = data[index].viscosity;
    tbn[index] = data[index].dtn;
    timexyma[index] = data[index].updatedAt;
  }

    const handleDownload = () => {
      let selectedArray = [];
      let selectedName;
      switch (selectXyma) {
        case 'density':
          selectedName = 'density';
          selectedArray = density;
          break;
        case 'viscosity':
          selectedName = 'viscosity';
          selectedArray = viscosity;
          break;
        case 'temperature':
          selectedName = 'temperature';
          selectedArray = temperature;
          break;
        case 'dtn':
          selectedName = 'Tbn';
          selectedArray = tbn;
          break;
        default:
          selectedName = 'density';
          selectedArray = density;
          break;
      }
      console.log("excel",selectedName);
      const data = [[selectedName, 'timestamp'], ...selectedArray.map(value => [value,timexyma])];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
      XLSX.writeFile(workbook, `excel_data_${selectedName}.xlsx`);
    };  
    
    // const handleDownloadNano = () => {
    //   // console.log('NanoSelect', selectNano);
    //   let val = nanoData[0]?.data;
    //   let time = nanoData[0]?.timestamp;
    //   const data = [[`${selectNano}`,'timestamp'], ...val.map((value, index)=> [value, time[index]])];
    //   const worksheet = XLSX.utils.aoa_to_sheet(data);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    //   XLSX.writeFile(workbook, "3Lions.xlsx");
    // };
    const handleDownloadNano = () => {
  setTimeout(() => {
    const val = nanoData[0]?.data;
    const timestamps = nanoData[0]?.timestamp;

    if (!val || !timestamps) {
      console.error('Invalid nanoData');
      return;
    }

    // Convert epoch timestamps to formatted date strings
    const formattedTimestamps = timestamps.map((epochTimestamp) => {
      const date = new Date(epochTimestamp * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    });

    const data = [[`${selectNano}`, 'timestamp'], ...val.map((value, index) => [value, formattedTimestamps[index]])];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "3Lions.xlsx");
  }, 2000);
};
    
//nano
    const options = ["temperature", "battery", "sound-rms", "humidity", "flux-rms", "speed"];
    const handleOptionChange = (event) => {
      let value = event.target.value;
      setSelectNano(value);
    };
//xyma
    const optionxyma = ["Density", "Viscosity", "Temperature","TDN"];
    const handleOptionChangexyma = (event) => {
      let value = event.target.value;
      console.log("val",value);
      switch (value) {
        case 'Density':
          setSelectXyma('density');
          break;
        case 'Viscosity':
          setSelectXyma('viscosity');
          break;
        case 'Temperature':
          setSelectXyma('temperature');
          break;
        case 'TDN':
          setSelectXyma('dtn');
          break;
        default:
          setSelectXyma('viscosity');
          break;
      }
    };
    console.log("xyma", selectXyma);

  return (
    <div className="report">
      <div className="header">
        <div className="title">
          <h1>Excel</h1>
        </div>
      </div>
      <div className="body">
        <div className="xyma">
          <div className="name">
            <h1>Xyma Sensor</h1>
          </div>
          <div className="bottom">
            <div className="logo">
              <img
                src={report_logo}
                alt="report_logo"
                style={{ width: "400px", height: "400px" }}
              />
            </div>
            <div className="input">
          <label className="text-black" htmlFor="xymadropdown">Select</label>
          <select className="xymavalue bg-slate-500"
            id="xymadropdown"
            onChange={handleOptionChangexyma}
            value={selectXyma || ""}
          >
            {optionxyma.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>
            <div
              className="xl_btn"
              onClick={() => {
                handleDownload();
              }}
            >
              <span>Download</span>
            </div>
          </div>
        </div>
        <div className="nano">
          <div className="name">
            <h1>Nano Precise Sensors</h1>
          </div>
          <div className="bottom">
            <div className="logo">
              <img
                src={report_logo_nano}
                alt="report_logo"
                style={{ width: "400px", height: "400px" }}
              />
            </div>
            <div className="input">
          <label className="text-black" htmlFor="nanodropdown">Select</label>
          <select className="value bg-slate-500"
            id="nanodropdown"
            onChange={handleOptionChange}
            value={selectNano || ""}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>
            <div className="xl_btn" 
            onClick={() => {
              handleDownloadNano();
            }}>
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
