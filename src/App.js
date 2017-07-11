import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Field from './components/Field';
import {start, stop, changeDirection} from './ducks/Game/Game';
import Button from './components/Button';
import {getDirectionFromKey} from './utils/utils';

let onKeyDown = function (e) {
	const direction = getDirectionFromKey(e);
	if (direction !== null) {
		this.props.dispatch(changeDirection(direction));
	}
};

class App extends Component {

	componentWillMount() {
		onKeyDown = onKeyDown.bind(this);
		document.addEventListener('keydown', onKeyDown);

	}

	componentWillUnmount() {
		document.removeEventListener('keydown', onKeyDown);
	}

	render() {
		const {size, snake, food, score, dispatch, started} = this.props;
		return (
			<div className="App">
				<div className="App-header">Snake Game</div>
				<div>Score: {score}</div>
				<Field size={size} snake={snake} food={food}/>
				<div className="App-controls">
					<Button click={() => dispatch(start())} disabled={started}>Start!</Button>
					<Button click={() => dispatch(stop())} disabled={!started}>Stop</Button>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	size: PropTypes.number.isRequired,
	snake: PropTypes.arrayOf(PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	})),
	food: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),
	score: PropTypes.number.isRequired,
	dispatch:PropTypes.func.isRequired,
	started: PropTypes.bool.isRequired
};

export default connect((state) => state)(App);
export {App};
