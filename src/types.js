import PropTypes from 'prop-types';

export const ModalType = {
  open: PropTypes.bool.isRequired,
  weatherforecast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    temperatureC: PropTypes.number.isRequired,
    temperatureF: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
  }),
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
