// Game.js
import * as utils from '../../utils/utils';
import {DIRECTIONS} from '../../utils/constants';

// Actions
export const START = 'snake/game/START';
export const CREATE_SNAKE = 'snake/game/CREATE_SNAKE';
export const SPAWN_FOOD = 'snake/game/SPAWN_FOOD';
export const STOP = 'snake/game/STOP';
export const MOVE_SNAKE = 'snake/game/MOVE_SNAKE';
export const CHANGE_DIRECTION = 'snake/game/CHANGE_DIRECTION';

const defaultState = {
	size: 20,
	snakeSize: 3,
	started: false,
	direction: DIRECTIONS.UP,
	bufferedDirection: DIRECTIONS.UP,
	score: -1 //Will turn to 0 automatically as soon as first food piece has been placed
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
	let newState;
	switch (action.type) {
		case START: {
			newState = Object.assign({}, state, {started: true});
			break;
		}
		case STOP: {
			newState = Object.assign({}, state, defaultState);
			break;
		}
		case CREATE_SNAKE: {
			newState = Object.assign({}, state, {snake: utils.createSnake(state.size, state.snakeSize)});
			break;
		}
		case SPAWN_FOOD: {
			newState = Object.assign({}, state, {food: utils.spawnFood(state.size), score: state.score + 1});
			break;
		}
		case CHANGE_DIRECTION: {
			newState = Object.assign({}, state, {bufferedDirection: action.payload});
			break;
		}
		case MOVE_SNAKE: {
			newState = Object.assign({}, state, {
				direction: state.bufferedDirection,
				snake: utils.moveSnake(state.snake, state.bufferedDirection, action.payload)
			});
			break;
		}
		default:
			newState = state;
	}
	return newState;
}

// Action Creators
export function start() {
	return (dispatch, getState) => {
		//Dispatch start
		dispatch({type: START});
		//Run main cycle until the game has been stopped
		const run = () => {
			setTimeout(() => {
				if (getState().game.started) {
					dispatch(move());
					run();
				}
			}, 500);
		};
		run();
	};
}


export function init() {
	return (dispatch) => {
		dispatch({type: CREATE_SNAKE});
		dispatch({type: SPAWN_FOOD});
	};
}

export function stop() {
	return (dispatch) => {
		dispatch({type: STOP});
		dispatch(init());
	}
}

export function move() {
	return (dispatch, getState) => {
		const state = getState().game;
		if (utils.canPerformMove(state.size, state.snake, state.bufferedDirection)) {
			const willEat = utils.willEatFood(state.snake, state.bufferedDirection, state.food);
			dispatch({type: MOVE_SNAKE, payload: willEat});
			if (willEat) {
				dispatch({type: SPAWN_FOOD});
			}
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
	}
}