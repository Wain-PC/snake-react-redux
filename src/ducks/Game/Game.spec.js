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

		it('should return initial state when called without parameters (or with invalid ones)', () => {
			expect(reducer()).toEqual(initialState);
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
			beforeEach(() => jest.useFakeTimers());

			//Call stop() after each start call to prevent the game from updating state periodically
			afterEach(() => {
				jest.clearAllTimers();
			});

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

			it("should start move cycle timer with 500ms timeout", () => {
				const fn = start()(dispatch, () => Object.assign({}, getState(), { started: true }));
				expect(setTimeout.mock.calls[0][1]).toBe(500);
				//It should call move action instantly, then each 500ms
				expect(setTimeout.mock.calls.length).toBe(1);
				jest.runTimersToTime(500);
				expect(setTimeout.mock.calls.length).toBe(2);
				jest.runTimersToTime(500);
				expect(setTimeout.mock.calls.length).toBe(3);
			});

			it("should NOT start move cycle timer when the game is not started", () => {
				const fn = start()(dispatch, getState);
				jest.runTimersToTime(2000);
				expect(dispatch.mock.calls.length).toBe(1);
			});
		});

		describe('stop', () => {
			it('should be a function', () => {
				expect(stop).toBeInstanceOf(Function);
			});

			it('should return an action object', () => {
				expect(stop()).toBeInstanceOf(Object);
				expect(stop()).toEqual({ type: STOP });
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

			it("should call for food spawn if snake is going to eat ", () => {
				//First, init the snake
				const initialStateWithSnakeAndFood = reducer(initialState, { type: CREATE_SNAKE });
				//Add food manually near the head of the snake
				initialStateWithSnakeAndFood.food = {
					x: initialStateWithSnakeAndFood.snake[0].x,
					y: initialStateWithSnakeAndFood.snake[0].y - 1
				};
				const getState = () => initialStateWithSnakeAndFood;

				const fn = move()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: MOVE_SNAKE, payload: true });
				expect(dispatch.mock.calls[1][0]).toEqual({ type: SPAWN_FOOD });
			});

			it("should dispatch `stop` action if the snake is going to die", () => {
				const getState = () => Object.assign({}, initialState, {
					snake: [
						{
							x: 5,
							y: 0
						},
						{
							x: 5,
							y: 1
						},
						{
							x: 5,
							y: 2
						}]
				});

				const fn = move()(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: STOP });
			});
		});

		describe('changeDirection', () => {
			it('should be a function', () => {
				expect(changeDirection).toBeInstanceOf(Function);
			});

			it('should return a function', () => {
				expect(changeDirection()).toBeInstanceOf(Function);
			});

			it("should dispatch CHANGE_DIRECTION action if this is possible for the snake to turn", () => {
				const fn = changeDirection(DIRECTIONS.LEFT)(dispatch, getState);
				expect(dispatch.mock.calls[0][0]).toEqual({ type: CHANGE_DIRECTION, payload: DIRECTIONS.LEFT });
			});

			it("should not dispatch CHANGE_DIRECTION action if it's not possible for the snake to turn (e.g., opposite direction)", () => {
				const fn = changeDirection(DIRECTIONS.DOWN)(dispatch, getState);
				expect(dispatch.mock.calls.length).toBe(0);
			});
		});

	});


});