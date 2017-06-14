import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Field from './components/Field';
import {start, stop, changeDirection, init} from './ducks/game';
import Button from './components/Button';
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
				<div>Score: {this.props.score}</div>
				<Field field={this.props.field}/>
				<div className="App-controls">
					<Button click={() => this.props.dispatch(start())} disabled={this.props.started}>Start!</Button>
					<Button click={() => this.props.dispatch(stop())} disabled={!this.props.started}>Stop</Button>
				</div>
			</div>
		);
	}
}

export default connect((state) => state.game)(App);
export {App};
