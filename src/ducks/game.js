// game.js

// Actions
const START = 'snake/game/START';
const STOP = 'snake/game/STOP';
const PAUSE = 'snake/game/PAUSE';
const MOVE = 'snake/game/MOVE';

const defaultState = {
	size: 20,
	started: false,
	paused: false,
	stepTime: 1000
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case START: {
			return Object.assign({}, state, {started: true, paused: false})
		}
		case STOP: {
			return Object.assign({}, state, {started: false, paused: false})
		}
		case PAUSE: {
			return Object.assign({}, state, {paused: true})
		}
		case MOVE: {
			return Object.assign({}, state, {direction: action.payload});
		}
		default:
			return state;
	}
}

// Action Creators
export function start() {
	return (dispatch)=> {
		//Dispatch start
		dispatch({type: START});

	}
}

export function stop() {
	return {type: STOP};
}

export function pause() {
	return {type: PAUSE};
}

export function move(direction) {
	return {type: MOVE, payload: direction};
}