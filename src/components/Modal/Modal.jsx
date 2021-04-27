import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { ModalType } from '../../types';
import './Modal.css';

export const Modal = ({
  open, weatherforecast, handleSave, handleClose,
}) => {
  const [date, setDate] = useState('');
  const [temperatureC, setTemperatureC] = useState(0);
  const [temperatureF, setTemperatureF] = useState(0);
  const [summary, setSummary] = useState('');
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    setDate(weatherforecast ? weatherforecast.date : '');
    setTemperatureC(weatherforecast ? weatherforecast.temperatureC : 0);
    setTemperatureF(weatherforecast ? weatherforecast.temperatureF : 0);
    setSummary(weatherforecast ? weatherforecast.summary : '');
  }, [open, weatherforecast]);

  if (!open || !weatherforecast) {
    return null;
  }

  const validateField = (e) => {
    const { value } = e.target;

    if (validator.isDate(value)) {
      setDateError(false);
    } else {
      setDateError(true);
    }
  };

  const save = () => {
    handleSave({
      ...weatherforecast, date, temperatureC, temperatureF, summary,
    });
    handleClose();
  };

  const modalInvalid = !date
    || dateError
    || !temperatureC
    || !temperatureF
    || !summary;

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <button
          type="button"
          className="close"
          onClick={handleClose}
        >
          ×
        </button>

        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          name="date"
          onChange={e => setDate(e.target.value)}
          onBlur={validateField}
        />
        {dateError && (
        <p className="is-danger">
          The date is not valid
        </p>
        )}

        <label htmlFor="temperatureC">TemperatureC</label>
        <input
          type="number"
          value={temperatureC}
          name="temperatureC"
          onChange={e => setTemperatureC(e.target.value)}
        />
        { !temperatureC && (
        <p className="is-danger">
          The temperature must have at least one number
        </p>
        )}

        <label htmlFor="temperatureF">TemperatureF</label>
        <input
          type="number"
          value={temperatureF}
          name="temperatureF"
          onChange={e => setTemperatureF(e.target.value)}
        />
        { !temperatureF && (
        <p className="is-danger">
          The temperature must have at least one number
        </p>
        )}

        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          value={summary}
          name="summary"
          maxLength="127"
          onChange={e => (setSummary(e.target.value))}
        />
        { summary.length > 126 && (
        <p className="is-danger">
          The summary must be no more than 127 characters
        </p>
        )}

        <div>
          <button
            type="button"
            className="save"
            onClick={save}
            disabled={modalInvalid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = ModalType;
