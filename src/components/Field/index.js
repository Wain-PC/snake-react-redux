import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import {updateField} from '../../utils/utils';

const Field = ({size, snake, food}) => {
	const field = updateField(size, snake, food);
	let rows = [];
	for (let i = 0; i < size; i++) {
		let cells = [];
		for (let j = 0; j < size; j++) {
			cells.push(<Cell key={j} value={field[i][j]}/>);
		}
		rows[i] = <div key={i} className="Field__row">{cells}</div>;

	}

	//Let's create a field
	return <div className="Field">{rows}</div>
};

Field.propTypes = {
	size: PropTypes.number.isRequired,
	snake: PropTypes.arrayOf(PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	})),
	food: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	})
};



export default Field;