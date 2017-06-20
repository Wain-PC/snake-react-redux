import React from "react";

import reducer, {
	CHANGE_DIRECTION,
	changeDirection,
	CREATE_SNAKE,
	init,
	move,
	SPAWN_FOOD,
	start,
	START,
	stop,
	STOP
} from "./Game";
import * as utils from "../../utils/utils";
import {DIRECTIONS} from "../../utils/constants";


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
			expect(reducer(initialState, { type: START })).toEqual(extend({ started: true }));
		});

		it('should handle "STOP" action correctly', () => {
			expect(reducer(extend({ started: true }), { type: STOP })).toEqual(initialState);
		});

		it.skip('should handle "CREATE_SNAKE" action correctly', () => {
			expect(reducer(initialState, { type: CREATE_SNAKE })).toEqual(extend({ snake: utils.createSnake(initialState.size, initialState.snakeSize) }));
		});

		it.skip('should handle "SPAWN_FOOD" action correctly', () => {
			expect(reducer(initialState, { type: SPAWN_FOOD })).toEqual(extend({
				food: utils.spawnFood(initialState.size),
				score: 0
			}));
		});

		it('should handle "CHANGE_DIRECTION" action correctly', () => {
			const keys = Object.keys(DIRECTIONS);
			keys.forEach((key) => expect(reducer(initialState, {
				type: CHANGE_DIRECTION,
				payload: DIRECTIONS[key]
			})).toEqual(extend({ bufferedDirection: DIRECTIONS[key] })));
		});

		it.skip('should handle "MOVE_SNAKE" action correctly', () => {
			//TODO: finish this
		});

	});
	describe("Action Creators", () => {
		let dispatch, getState;

		beforeEach(() => {
			dispatch = jest.fn();
			getState = () => initialState;
		});

		describe('init', () => {
			it('should be a function', () => {
				expect(init).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(init()).toBeInstanceOf(Function);
			});

			it("should call appropriate actions", () => {
				const fn = init()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: CREATE_SNAKE });
				expect(dispatch.mock.calls[1][0]).toEqual({ type: SPAWN_FOOD });
			});
		});

		describe('start', () => {
			it('should be a function', () => {
				expect(start).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(start()).toBeInstanceOf(Function);
			});

			it("should call appropriate actions", () => {
				const fn = start()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: START });
			});
		});

		describe('stop', () => {
			it('should be a function', () => {
				expect(stop).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(stop()).toBeInstanceOf(Function);
			});

			it("should call appropriate actions", () => {
				const fn = stop()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: STOP });
			});
		});

		describe('move', () => {
			it('should be a function', () => {
				expect(move).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(move()).toBeInstanceOf(Function);
			});

			//TODO: doesn't work as expected
			it.skip("should call appropriate actions", () => {
				const fn = move()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: MOVE });
			});
		});

		describe('changeDirection', () => {
			it('should be a function', () => {
				expect(changeDirection).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(changeDirection()).toBeInstanceOf(Function);
			});

			//TODO: doesn't work as expected
			it.skip("should call appropriate actions", () => {
				const fn = changeDirection(DIRECTIONS.LEFT)(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: CHANGE_DIRECTION, payload: DIRECTIONS.LEFT });
			});
		});

	});


});