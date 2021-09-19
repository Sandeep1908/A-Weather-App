import React, { useState, useEffect } from "react";
import "./Main.css";
const Main = () => {
  const [value, setValue] = useState("bhopal");
  const [climate, setClimate] = useState({});
  const [climatename, setClimatename] = useState("");

  const time = new Date(climate.sunset * 1000);
  const handleclick = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=bc8c31ed27ee15cda3fb10b0d626fa91`
      );
      const data = await res.json();
      const { name } = data;
      const { temp, pressure, humidity } = data.main;
      const { country, sunset } = data.sys;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;

      const mydata = {
        name,
        temp,
        pressure,
        humidity,
        country,
        sunset,
        weathermood,
        speed,
      };
      setClimate(mydata);
    } catch (error) {
      alert("City not Found");
    }
  };

  useEffect(() => {
    if (climate.weathermood) {
      switch (climate.weathermood) {
        case "Clear":
          setClimatename("wi-day-sunny");
          break;
        case "Haze":
          setClimatename("wi-fog");
          break;
        case "Clouds":
          setClimatename("wi-day-cloudy");
          break;
        case "Thunderstorm":
          setClimatename("wi-day-thunderstorm");
          break;
        default:
          setClimatename("wi-day-sunny");
      }
    }
  }, [climate.weathermood]);

  return (
    <>
      <div className="nav">
        <div>
          <input
            type="search"
            className="input-handle"
            autoFocus
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="btn" onClick={handleclick}>
            Search
          </button>
        </div>
      </div>
      <div className="container">
        <div className="icons">
          <i className={`wi ${climatename}`}></i>
        </div>

        <div className="container-2">
          <div className="one">
            <div>
              <span className="temp">
                {climate.temp}
                <i className="wi wi-celsius"></i>
              </span>
            </div>

            <div className='temp-diff'>
            <div>
              <span className="temp1">{climate.weathermood}</span>
            </div>
            <div>
              <span className="temp2">
                {climate.name} {climate.country}
              </span>
            </div>
            </div>
          </div>
          <div className="two">
            <span className="time">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <div className="container-3">
          <div className="first">
            <div className="weather">
              <span>
                <i className="wi wi-sunset"></i>
              </span>
            </div>
            <div className="info">
              <span>
                {`${time.getHours()}:${time.getMinutes()}`} <br />
                Sunset
              </span>
            </div>
          </div>
          <div className="first">
            <div className="weather">
              <span>
                <i className="wi wi-humidity"></i>
              </span>
            </div>
            <div className="info">
              <span>
                {climate.humidity} <br />
                Humidity
              </span>
            </div>
          </div>
          <div className="first">
            <div className="weather">
              <span>
                <i className="wi wi-windy"></i>
              </span>
            </div>
            <div className="info">
              <span>
                {climate.pressure} <br />
                Pressure
              </span>
            </div>
          </div>

          <div className="first">
            <div className="weather">
              <span>
                <i className="wi wi-strong-wind"></i>
              </span>
            </div>
            <div className="info">
              <span>
                {climate.speed} <br />
                Speed
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
