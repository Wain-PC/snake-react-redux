import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Field from './components/Field';
import {start, stop, changeDirection, move, init} from './ducks/game';
import Button from './components/Button';
import {DIRECTIONS} from './utils/constants';
import useKeyboard from './utils/keyboard';

class App extends Component {

	componentWillMount() {
		this.props.dispatch(init());
		useKeyboard((d) => this.props.dispatch(changeDirection(d)));
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">Snake Game</div>
				<Field size={this.props.size}/>
				<div className="App-controls">
					<Button click={() => this.props.dispatch(start())} disabled={this.props.started}>Start!</Button>
					<Button click={() => this.props.dispatch(stop())} disabled={!this.props.started}>Stop</Button>
				</div>
			</div>
		);
	}
}

export default connect((state) => state.game)(App);
