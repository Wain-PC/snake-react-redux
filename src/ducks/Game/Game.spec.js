import React from 'react';

import reducer, {
	start,
	init,
	stop,
	move,
	changeDirection,
	START,
	STOP,
	CHANGE_DIRECTION,
	SPAWN_FOOD,
	CREATE_SNAKE,
	MOVE_SNAKE
} from './Game';
import * as utils from '../../utils/utils';
import {DIRECTIONS} from '../../utils/constants';


describe('Game', () => {
	let initialState;
	beforeEach(() => initialState = {
		size: 20,
		snakeSize: 3,
		started: false,
		field: utils.createField(20),
		direction: DIRECTIONS.UP,
		bufferedDirection: DIRECTIONS.UP,
		score: -1
	});

	const extend = (value) => Object.assign({}, initialState, value);

	describe("Reducer", () => {
		it('should be a function', () => {
			expect(reducer).toBeInstanceOf(Function);
		});

		it('should handle "START" action correctly', () => {
			expect(reducer(initialState, {type: START})).toEqual(extend({started: true}));
		});

		it('should handle "STOP" action correctly', () => {
			expect(reducer(extend({started: true}), {type: STOP})).toEqual(initialState);
		});

		it.skip('should handle "CREATE_SNAKE" action correctly', () => {
			expect(reducer(initialState, {type: CREATE_SNAKE})).toEqual(extend({snake: utils.createSnake(initialState.size, initialState.snakeSize)}));
		});

		it.skip('should handle "SPAWN_FOOD" action correctly', () => {
			expect(reducer(initialState, {type: SPAWN_FOOD})).toEqual(extend({
				food: utils.spawnFood(initialState.size),
				score: 0
			}));
		});

		it('should handle "CHANGE_DIRECTION" action correctly', () => {
			const keys = Object.keys(DIRECTIONS);
			keys.forEach((key) => expect(reducer(initialState, {
				type: CHANGE_DIRECTION,
				payload: DIRECTIONS[key]
			})).toEqual(extend({bufferedDirection: DIRECTIONS[key]})));
		});

		it.skip('should handle "MOVE_SNAKE" action correctly', () => {
			//TODO: finish this
		});

	});
	describe("Action Creators", () => {

		describe('init', () => {
			it('should be a function', () => {
				expect(init).toBeInstanceOf(Function);
			});
		});

		describe('start', () => {
			it('should be a function', () => {
				expect(start).toBeInstanceOf(Function);
			});
		});

		describe('stop', () => {
			it('should be a function', () => {
				expect(stop).toBeInstanceOf(Function);
			});
		});

		describe('move', () => {
			it('should be a function', () => {
				expect(move).toBeInstanceOf(Function);
			});
		});

		describe('changeDirection', () => {
			it('should be a function', () => {
				expect(changeDirection).toBeInstanceOf(Function);
			});
		});

	});


});