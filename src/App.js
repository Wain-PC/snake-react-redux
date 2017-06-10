import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Field from './components/Field';
import {start, stop, pause, move} from './ducks/game';
import Button from './components/Button';
import {DIRECTIONS} from './utils/constants';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">Snake Game</div>
				<Field size={this.props.size}/>
				<div className="App-controls">
					<Button click={() => this.props.dispatch(start())}
									disabled={this.props.started && !this.props.paused}>Start!</Button>
					<Button click={() => this.props.dispatch(stop())} disabled={!this.props.started}>Stop</Button>
					<Button click={() => this.props.dispatch(pause())}
									disabled={this.props.paused || !this.props.started}>Pause</Button>
				</div>
				<div className="App-controls">
					<Button click={() => this.props.dispatch(move(DIRECTIONS.UP))}
									disabled={!this.props.started || this.props.paused || this.props.direction === DIRECTIONS.DOWN}>UP</Button>
					<Button click={() => this.props.dispatch(move(DIRECTIONS.DOWN))}
									disabled={!this.props.started || this.props.paused || this.props.direction === DIRECTIONS.UP}>DOWN</Button>
					<Button click={() => this.props.dispatch(move(DIRECTIONS.LEFT))}
									disabled={!this.props.started || this.props.paused || this.props.direction === DIRECTIONS.RIGHT}>LEFT</Button>
					<Button click={() => this.props.dispatch(move(DIRECTIONS.RIGHT))}
									disabled={!this.props.started || this.props.paused || this.props.direction === DIRECTIONS.LEFT}>RIGHT</Button>
				</div>
			</div>
		);
	}
}

export default connect((state) => state.game)(App);
