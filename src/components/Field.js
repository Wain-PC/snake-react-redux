import React from 'react';
import {connect} from 'react-redux';
import Cell from './Cell';

const Field = ({field}) => {
	const size = field.length;
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

const mapStateToProps = (state) => {return {field: state.game.field}};

export default connect(mapStateToProps)(Field);