import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export function Filter({ value, onFilter }) {
  return (
    <div className={css.filter}>
      <label className={css.filt_lable}>
        Find contacts by name
        <input
          className={css.filt_inp}
          type="text"
          value={value}
          onChange={onFilter}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
