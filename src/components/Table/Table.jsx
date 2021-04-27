import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './Table.css';
import weatherFromServer from '../../api/api.json';

export const Table = () => {
  const [weatherforecasts, setWeatherforecasts] = useState(weatherFromServer);
  const [modal, setModal] = useState({
    active: false,
    weatherforecast: null,
  });

  const openModal = (weatherforecast) => {
    setModal({
      active: true, weatherforecast,
    });
  };

  const closeModal = () => {
    setModal({
      active: false, weatherforecast: null,
    });
  };

  const saveWeatherforecast = (weatherforecast) => {
    setWeatherforecasts(
      prevWeatherforecasts => prevWeatherforecasts.map((forecast) => {
        if (forecast.id !== weatherforecast.id) {
          return forecast;
        }

        return {
          ...forecast,
          date: weatherforecast.date,
          temperatureC: weatherforecast.temperatureC,
          temperatureF: weatherforecast.temperatureF,
          summary: weatherforecast.summary,
        };
      }),
    );
  };

  const removeData = (id) => {
    const deleted = weatherforecasts.filter(
      weatherforecast => id !== weatherforecast.id,
    );

    setWeatherforecasts(deleted);
  };

  return (
    <>
      <div className="btn-wrap">
        <button
          type="button"
          className="info"
        >
          Detailed information
        </button>
        <button
          type="button"
          className="question"
        >
          Question
        </button>
      </div>

      {weatherforecasts.length > 0 && (
      <table className="table">
        <caption>Weatherforecast</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (C)</th>
            <th>Temperature (F)</th>
            <th>Summary</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {weatherforecasts.map(weatherforecast => (
            <tr key={weatherforecast.id}>

              <td>
                {weatherforecast.date
                  .slice(0, 10).split('-').reverse().join('.')}
              </td>
              <td>{weatherforecast.temperatureC}</td>
              <td>{weatherforecast.temperatureF}</td>
              <td>{weatherforecast.summary}</td>
              <td>
                <button
                  type="button"
                  className="button-edit"
                  onClick={() => openModal(weatherforecast)}
                >
                  <i className="far fa-edit" />
                </button>
                <button
                  type="button"
                  className="button-remove"
                  onClick={() => removeData(weatherforecast.id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <Modal
        open={modal.active}
        handleClose={closeModal}
        handleSave={saveWeatherforecast}
        weatherforecast={modal.weatherforecast}
      />
    </>
  );
};
