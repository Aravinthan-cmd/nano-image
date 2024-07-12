import "../dashboard/dashboard.scss";
import density from "../../assets/images/density copy.png";
import { useEffect, useState } from "react";
import temperature from "../../assets/images/thermometer copy.png";
import visco from "../../assets/images/water copy.png";
import dtn from "../../assets/images/lab.png";
import { RadioButton, RadioGroup } from "react-radio-buttons";
import ReactApexChart from "react-apexcharts";
import TempChart from "../dashboard/TempChart";
import ship from "../../assets/images/IMG-20240321-WA0000~2.jpg";
import person from "../../assets/images/scene_02.0000.png";
import Vibration from "../../pages/dashboard/Vibration";
import nano from "../../assets/images/Nanoprecise_Logo.png";
import acoustic from "../../assets/images/acoustic.webp";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataImage, setDataImage] = useState(null);
  const [dataImage2, setDataImage2] = useState(null);
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [baseCode, setBaseCode] = useState([]);
  const [baseCode2, setBaseCode2] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [sendData, setSendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var url;
      try {
        url = "https://3lions.xyma.live/sensor/getsensor";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setData(datafetchVal);
      } catch (error) {
        console.log("error", error);
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

  //fetch
  useEffect(() => {
    const fetchData = async () => {
      var url;
      try {
        url = "https://3lions.xyma.live/sensor/getImage";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setDataImage(datafetchVal);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchData2 = async () => {
      var url;
      try {
        url = "https://3lions.xyma.live/sensor/getImage2";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setDataImage2(datafetchVal);
      } catch (error) {
        console.log("error", error);
      }
    };
    const interval = setInterval(() => {
      fetchData();
      fetchData2();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //image
  useEffect(() => {
    if (dataImage !== null) {
      let base = dataImage[0].image;
      setBaseCode(base);
    }
    const byteCharacters = atob(baseCode);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl);
  }, [dataImage]);

  //image2
  useEffect(() => {
    if (dataImage2 !== null) {
      let base2 = dataImage2[0].image;
      setBaseCode2(base2);
    }
    const byteCharacters2 = atob(baseCode2);
    const byteNumbers2 = new Array(byteCharacters2.length);
    for (let i = 0; i < byteCharacters2.length; i++) {
      byteNumbers2[i] = byteCharacters2.charCodeAt(i);
    }
    const byteArray2 = new Uint8Array(byteNumbers2);
    const blob2 = new Blob([byteArray2], { type: "image/png" });
    const imageUrl2 = URL.createObjectURL(blob2);
    setImage2(imageUrl2);
  }, [dataImage2]);

  const fetchAllData = async () => {
    var url;
    try {
      url = "https://3lions.xyma.live/sensor/getallSensor";
      console.log("url", url);
      const response = await fetch(url);
      const dataVal = await response.json();
      setAllData(dataVal);
    } catch (error) {
      console.log("error", error);
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
        name: "temp",
        data: sendData,
        stroke: {
          curve: "smooth",
          dashArray: [5, 5],
        },
      },
    ],
    chart: {
      height: 500,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: time,
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
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

  const handleOptionChange = (value) => {
    console.log("val", value);
    switch (value) {
      case "Density":
        setSendData(den);
        break;
      case "Viscosity":
        setSendData(vis);
        break;
      case "Temperature":
        setSendData(temp);
        break;
      case "Dtn":
        setSendData(dt);
        break;
      default:
        setSendData(temp);
        break;
    }
  };

  return (
    <div>
      <div className="grid grid-rows-1 lg:grid-rows-2">
        <div className="grid gap-3 grid-cols-1  lg:grid-cols-2">
          <div className="bg-[rgba(255,253,253,0.93)] rounded-lg h-[42vh]">
            <h4 className="font-bold text-xl ml-3 mt-2">Ports:</h4>
            <div className="grid mt-4 grid-rows-2">
              <div className="grid gap-2 grid-cols-2">
                <div className="bg-[#f8ae9b] grid grid-cols-2 rounded-lg ml-2 h-[15vh] justify-center items-center">
                  <img
                    src={density}
                    alt=""
                    className="ml-4"
                    style={{ width: "80px" }}
                  />
                  <div>
                    <h1 className="font-bold">Density</h1>
                    <span className="font-bold text-xl">
                      {data[0]?.density}kg/m³
                    </span>
                  </div>
                </div>

                <div className="bg-[#f8ae9b] grid grid-cols-2   rounded-lg  mr-2 h-[15vh] justify-center items-center">
                  <img
                    src={visco}
                    alt=""
                    className="ml-4"
                    style={{ width: "80px" }}
                  />
                  <div>
                    <h1 className="font-bold">Viscosity</h1>
                    <span className="font-bold text-xl">
                      {data[0]?.viscosity}cSt
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2 mt-2 grid-cols-2">
                <div className="bg-[#f8ae9b] rounded-lg grid grid-cols-2  ml-2 h-[15vh] justify-center items-center">
                  <img
                    src={temperature}
                    className="ml-4"
                    alt=""
                    style={{ width: "80px" }}
                  />
                  <div className="right">
                    <h1 className="font-bold">Temperature</h1>
                    <span className="font-bold text-xl">
                      {data[0]?.temperature}°C
                    </span>
                  </div>
                </div>
                <div className="bg-[#f8ae9b] rounded-lg  mr-2 grid grid-cols-2  h-[15vh] justify-center items-center">
                  <img
                    src={dtn}
                    alt=""
                    className="ml-4"
                    style={{ width: "80px" }}
                  />
                  <div className="right">
                    <h1 className="font-bold">TDN</h1>
                    <span className="font-bold text-xl">{data[0]?.dtn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fffdfdec] rounded-lg h-[42vh] relative">
            <h4 className="font-bold text-xl ml-3 mt-2">Camera Feed:</h4>
            <div className="absolute top-2" style={{ left: "70%" }}>
              <h1>
                Alert : <span className="text-red-700">Without_helmet</span>
              </h1>
            </div>
            <div className="flex flex-row mt-5 gap-2 p-1">
              <div className="border-4 border-black rounded-lg">
                <div className=" absolute top-9">Thermal</div>
                <img
                  src={image}
                  alt="img"
                  style={{ width: "350px", height: "270px" }}
                />
              </div>
              <div className="border-4 border-black rounded-lg">
                <div className=" absolute top-9">Acoustic</div>
                <img
                  src={acoustic}
                  alt="img"
                  style={{ width: "350px", height: "270px" }}
                />
              </div>
              <div className="border-4 border-black rounded-lg">
                <div className=" absolute top-9">HSE</div>
                <img
                  src={image2}
                  alt="img"
                  style={{ width: "350px", height: "270px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3 mt-3 grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#fffdfdec] rounded-lg h-[42vh]">
            <div className="list ml-4 mr-4">
              <h4 className="font-bold text-xl ml-2 mt-2 ">Model Feed:</h4>
              {/* <RadioGroup onChange={handleOptionChange} horizontal>
                <RadioButton
                  value="Density"
                  rootColor="#2196F3"
                  pointColor="#2196F3"
                >
                  Density
                </RadioButton>
                <RadioButton
                  value="Viscosity"
                  rootColor="#2196F3"
                  pointColor="#2196F3"
                >
                  Viscosity
                </RadioButton>
                <RadioButton
                  value="Temperature"
                  rootColor="#2196F3"
                  pointColor="#2196F3"
                >
                  Temperature
                </RadioButton>
                <RadioButton
                  value="Dtn"
                  rootColor="#2196F3"
                  pointColor="#2196F3"
                >
                  TDN
                </RadioButton>
              </RadioGroup> */}
            </div>
            <div className="w-full p-2">
              {/* <div className="w-full h-15 pt-2 pl-96 pb-6">
                <h1>
                  Alert : <span className="text-red-700">Without_helmet</span>
                </h1>
              </div> */}
              <div className="flex gap-1">
                <img src={ship} alt="ship" style={{ height: "300px" }} />
                {/* <img src={person} alt="person" style={{ height: "225px" }} /> */}
              </div>
            </div>
            {/* <ReactApexChart
              className="bg-[#979797cb] rounded-lg ml-4 mr-4 mt-4"
              options={chartOptions}
              series={chartOptions.series}
              type="line"
              height="65%"
            /> */}
          </div>
          <div className="bg-[#fffdfdec] rounded-lg h-[42vh]">
            {/* <img
              src={nano}
              alt="ship"
              style={{ width: "200px", height: "60px" }}
            /> */}
            <h4 className="font-bold text-xl ml-3 mt-2">Vibration:</h4>
            {/* <Vibration /> */}
            {/* <div className="ml-3">
            <TempChart />
            </div> */}
            <TempChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
