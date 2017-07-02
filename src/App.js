import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Field from './components/Field';
import {start, stop, changeDirection, init} from './ducks/Game/Game';
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
		this.props.dispatch(init());
		onKeyDown = onKeyDown.bind(this);
		document.addEventListener('keydown', onKeyDown);

	}

	componentWillUnmount() {
		document.removeEventListener('keydown', onKeyDown);
	}

	render() {
		const {size, snake, food, score, dispatch, started} = this.props;
		return (
			<div className="App" tabIndex="0">
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

export default connect((state) => state)(App);
export {App};
