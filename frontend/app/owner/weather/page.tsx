"use client";

import Container from "@/components/Container";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Sydney,au&appid=de6cb8f3a03c5206b2da4d473d2fc018&units=imperial`
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      {Object.keys(data).length > 0 ? (
        <>
          <h1 className="font-bold text-2xl">
            <span className="mr-4">City:</span>
            {(data as any).name},{(data as any).sys.country}
          </h1>
          <table className="min-w-full divide-y divide-gray-200 mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Temperature
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Forecast
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).length > 0 ? (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(data as any).main.temp}°F
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(data as any).weather[0].main}
                  </td>
                </tr>
              ) : (
                <div>
                  <h1>Weather data not fetched yet.</h1>
                </div>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Weather data not fetched yet.</h1>
      )}
    </Container>
  );
};

export default Weather;
