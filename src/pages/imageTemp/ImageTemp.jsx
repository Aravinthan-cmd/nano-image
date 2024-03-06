import React from "react";
import { useState, useEffect } from "react";
import "../imageTemp/imagetemp.scss";
import red from '../../assets/images/alert-red.png';
import green from '../../assets/images/alert-green.png';

const ImageTemp = () => {
  const [data,setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [baseCode, setBaseCode] = useState([]);
  const [baseCode2, setBaseCode2] = useState([]);
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [temperature, setTemperature] = useState(0);
  const [alert, setAlert] = useState(true);

  //fetch
  useEffect(() => {
    const fetchData = async () => {
      var url;
      try {
        url = "http://3.111.136.104:5001/sensor/getImage";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setData(datafetchVal);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchData2 = async () => {
      var url;
      try {
        url = "http://3.111.136.104:5001/sensor/getImage2";
        const response = await fetch(url);
        const datafetchVal = await response.json();
        setData2(datafetchVal);
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
  },[]);

  //image
  useEffect(() => {
    if (data !== null) {
      let base = data[0].image;
      let temp = data[0].temperature;
      setTemperature(temp);
      setBaseCode(base);
    }
    const byteCharacters = atob(baseCode);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });

  // Create a data URL from the Blob
  const imageUrl = URL.createObjectURL(blob);
  setImage(imageUrl);
  }, [data]);
  
  //image2
  useEffect(() => {
    if (data2 !== null) {
      let base2 = data2[0].image;
      let alert = data2[0].alert;
      setAlert(alert);
      setBaseCode2(base2);
    }
    const byteCharacters2 = atob(baseCode2);
  const byteNumbers2 = new Array(byteCharacters2.length);
  for (let i = 0; i < byteCharacters2.length; i++) {
    byteNumbers2[i] = byteCharacters2.charCodeAt(i);
  }
  const byteArray2 = new Uint8Array(byteNumbers2);
  const blob2 = new Blob([byteArray2], { type: 'image/png' });

  // Create a data2 URL from the Blob
  const imageUrl2 = URL.createObjectURL(blob2);
  setImage2(imageUrl2);
  }, [data2]);

  return (
    <div className="imageTemp">
      <div className="temperature">
        <h1>Temperature: {temperature}°C</h1>
        <h1 className="flex gap-3.5 justify-center items-center">Alert: 
          <img src={alert ? red : green} alt="alert" style={{width:'40px'}} />
        </h1>
      </div>
      <div className="image">
        <div className="tempcam">
        <img src={image} alt="temp_cam" style={{ width: "95%", height: "95%" }} />
        </div>
        <div className="normalcam">
          <img src={image2} alt="normal_cam" style={{ width: "95%", height: "95%" }} />
        </div>
      </div>
    </div>
  );
};

export default ImageTemp;
