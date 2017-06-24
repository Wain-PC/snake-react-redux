import React from "react";

import reducer, {
	CHANGE_DIRECTION,
	changeDirection,
	CREATE_SNAKE,
	init,
	move,
	MOVE_SNAKE,
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

		it('should handle "CREATE_SNAKE" action correctly', () => {
			expect(reducer(initialState, { type: CREATE_SNAKE })).toEqual(extend({ snake: utils.createSnake(initialState.size, initialState.snakeSize) }));
		});

		it('should handle "SPAWN_FOOD" action correctly', () => {
			const result = reducer(initialState, { type: SPAWN_FOOD });
			expect(result.score).toEqual(0);
			expect(result.food.x).toBeGreaterThanOrEqual(0);
			expect(result.food.x).toBeLessThan(initialState.size);
			expect(result.food.y).toBeGreaterThanOrEqual(0);
			expect(result.food.y).toBeLessThan(initialState.size);
		});

		it('should handle "CHANGE_DIRECTION" action correctly', () => {
			const keys = Object.values(DIRECTIONS);
			keys.forEach((direction) => expect(reducer(initialState, {
				type: CHANGE_DIRECTION,
				payload: direction
			})).toEqual(extend({ bufferedDirection: direction })));
		});

		it('should handle "MOVE_SNAKE" action correctly', () => {
			const initialStateWithSnake = reducer(initialState, { type: CREATE_SNAKE });
			const result = reducer(initialStateWithSnake, { type: MOVE_SNAKE });
			return expect(result.snake).toEqual(initialStateWithSnake.snake.map(({ x, y }) => ({ x, y: y - 1 })));
		});

	});
	describe("Action Creators", () => {
		let dispatch, getState;

		beforeEach(() => {
			dispatch = jest.fn();
			getState = () => (initialState);
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

			it("should call appropriate actions (when snake is available)", () => {
				//First, init the snake
				const initialStateWithSnake = reducer(initialState, { type: CREATE_SNAKE });
				const getState = () => initialStateWithSnake;

				const fn = move()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: MOVE_SNAKE, payload: false });
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
			it("should call appropriate actions", () => {
				const fn = changeDirection(DIRECTIONS.LEFT)(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: CHANGE_DIRECTION, payload: DIRECTIONS.LEFT });
			});
		});

	});


});