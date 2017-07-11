import React from 'react';
import PropTypes from 'prop-types';
import {TYPES} from '../../utils/constants';

const Cell = ({value}) => {
	let color = 'transparent';
	if (value === TYPES.TYPE_SNAKE) {
		color = 'black';
	}
	else if (value === TYPES.TYPE_FOOD) {
		color = 'red';
	}
	return <div className="Cell" style={{backgroundColor: color}}></div>
};

Cell.propTypes = {
	value: PropTypes.oneOf([0,1,2])
};

export default Cell;