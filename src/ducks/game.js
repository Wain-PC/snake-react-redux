// game.js
import {createField, createSnake, spawnFood, updateField, moveSnake} from '../utils/field';

// Actions
const START = 'snake/game/START';
const CREATE_FIELD = 'snake/game/CREATE_FIELD';
const CREATE_SNAKE = 'snake/game/CREATE_SNAKE';
const SPAWN_FOOD = 'snake/game/SPAWN_FOOD';
const STOP = 'snake/game/STOP';
const PAUSE = 'snake/game/PAUSE';
const UPDATE_FRAME = 'snake/game/UPDATE_FRAME';
const MOVE_SNAKE = 'snake/game/MOVE_SNAKE';
const CHANGE_DIRECTION = 'snake/game/CHANGE_DIRECTION';

const defaultState = {
	size: 20,
	started: false,
	paused: false,
	stepTime: 1000,
	field: createField(20),
	direction: 0
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case START: {
			return Object.assign({}, state, {started: true, paused: false});
		}
		case STOP: {
			return Object.assign({}, state, {started: false, paused: false});
		}
		case PAUSE: {
			return Object.assign({}, state, {paused: true});
		}
		case CREATE_SNAKE: {
			return Object.assign({}, state, {snake: createSnake(state.size)});
		}
		case SPAWN_FOOD: {
			return Object.assign({}, state, {food: spawnFood(state.size)});
		}
		case UPDATE_FRAME: {
			return Object.assign({}, state, {field: updateField(state.size, state.snake, state.food)});
		}
		case MOVE_SNAKE: {
			const snake = moveSnake(state.snake, action.payload, state.direction);
			if (!snake) {
				return state;
			}
			return Object.assign({}, state, {snake, direction: action.payload});
		}
		case CHANGE_DIRECTION: {
			return Object.assign({}, state, {snake: moveSnake(state.snake, action.payload, state.direction)});
		}
		default:
			return state;
	}
}

// Action Creators
export function start() {
	return (dispatch) => {
		//Dispatch start
		dispatch({type: START});
		dispatch({type: CREATE_FIELD});
		dispatch({type: CREATE_SNAKE});
		dispatch({type: SPAWN_FOOD});
		dispatch({type: UPDATE_FRAME});
	}
}

export function stop() {
	return (dispatch) => {
		dispatch({type: STOP});
		dispatch({type: UPDATE_FRAME});
	}
}

export function pause() {
	return {type: PAUSE};
}

export function move(direction) {
	return (dispatch) => {
		dispatch({type: MOVE_SNAKE, payload: direction});
		dispatch({type: UPDATE_FRAME});
	}
}