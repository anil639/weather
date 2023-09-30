import React, { useEffect, useState } from "react";
import "./App.css";
import cloud from "./image/cloudy.png";
import humidity from "./image/humidity.png";
import windImg from "./image/wind.png";
function App() {
  const [city, setcity] = useState(null);
  const [search, setsearch] = useState("");
  const [wind, setwind] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=461d8c30ed051571e713e530229a08d1&units=metric`;
      const response = await fetch(url);
      const resjson = await response.json();
      setcity(resjson.main);
      setwind(resjson.wind);
    };
    fetchApi();
  }, [search]);

  return (
    <div className="App">
      <div className="body">
        <div className="card">
          <div className="search">
            <input
              placeholder="enter the city name"
              type="search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              className="inputField"
            ></input>
          </div>

          <div className="weather">
            <img src={cloud} alt="img" height={200}></img>
            {!city ? (
              <p>no data found</p>
            ) : (
              <h1 className="temp"> {city.temp}°c</h1>
            )}

            <h2 className="city">{search}</h2>
            <div className="details">
              <div className="col">
                <img src={humidity} alt="img"></img>
                <div>
                  {!city ? (
                    <p></p>
                  ) : (
                    <p className="humidity">{city.humidity}%</p>
                  )}
                  <p>humidity</p>
                </div>
              </div>

              <div className="col">
                <img src={windImg} alt="img"></img>
                <div>
                  {!wind ? (
                    <p></p>
                  ) : (
                    <p className="wind">{Math.round(wind.speed * 3.6)} km/h</p>
                  )}
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
