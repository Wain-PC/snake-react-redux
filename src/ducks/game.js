// game.js
import * as utils from '../utils/utils';

// Actions
const START = 'snake/game/START';
const CREATE_FIELD = 'snake/game/CREATE_FIELD';
const CREATE_SNAKE = 'snake/game/CREATE_SNAKE';
const SPAWN_FOOD = 'snake/game/SPAWN_FOOD';
const STOP = 'snake/game/STOP';
const UPDATE_FRAME = 'snake/game/UPDATE_FRAME';
const MOVE_SNAKE = 'snake/game/MOVE_SNAKE';
const CHANGE_DIRECTION = 'snake/game/CHANGE_DIRECTION';

const defaultState = {
	size: 20,
	started: false,
	paused: false,
	stepTime: 1000,
	field: utils.createField(20),
	direction: 0
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
	let newState;
	switch (action.type) {
		case START: {
			newState = Object.assign({}, state, {started: true, paused: false});
			break;
		}
		case STOP: {
			newState = Object.assign({}, state, {started: false, paused: false});
			break;
		}
		case CREATE_SNAKE: {
			newState = Object.assign({}, state, {snake: utils.createSnake(state.size)});
			break;
		}
		case SPAWN_FOOD: {
			newState = Object.assign({}, state, {food: utils.spawnFood(state.size)});
			break;
		}
		case CHANGE_DIRECTION: {
			newState = Object.assign({}, state, {direction: action.payload});
			break;
		}
		case MOVE_SNAKE: {
			newState = Object.assign({}, state, {snake: utils.moveSnake(state.snake, state.direction)});
			break;
		}
		default:
			newState = state;
	}
	return Object.assign(newState, {field: utils.updateField(newState.size, newState.snake, newState.food)});
}

// Action Creators
export function start() {
	return (dispatch, getState) => {
		//Dispatch start
		dispatch({type: START});
		dispatch({type: CREATE_FIELD});
		dispatch({type: CREATE_SNAKE});
		dispatch({type: SPAWN_FOOD});
		dispatch({type: CHANGE_DIRECTION, payload: 0});
	};
}

export function stop() {
	return (dispatch) => {
		dispatch({type: STOP});
	}
}

export function move() {
	return (dispatch, getState) => {
		const state = getState().game;
		if (utils.canPerformMove(state.field.length, state.snake, state.direction)) {
			dispatch({type: MOVE_SNAKE});
		}
		else {
			dispatch(stop());
		}

	}
}

export function changeDirection(direction) {
	return (dispatch, getState) => {
		const state = getState().game;
		if (utils.canChangeDirection(direction, state.direction)) {
			return dispatch({type: CHANGE_DIRECTION, payload: direction});
		}
		return dispatch({type: STOP});
	}
}