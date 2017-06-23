import * as utils from "./utils";
import {DIRECTIONS, TYPES} from "./constants";

describe('utils', () => {

	describe('createSnake', () => {

		it('should spawn snake with length === 1 when size not provided', () => {
			expect(utils.createSnake(10)).toHaveLength(1);
		});

		it('should spawn a snake with various lengths', () => {
			const fieldSize = 20;
			[1, 3, 5, 7, 10, 10].forEach(snakeSize => {
				const snake = utils.createSnake(fieldSize, snakeSize);
				expect(snake.length).toEqual(snakeSize);
				snake.forEach(snakePart => {
					expect(snakePart.x).toBeGreaterThanOrEqual(0);
					expect(snakePart.x).toBeLessThan(fieldSize);
					expect(snakePart.y).toBeGreaterThanOrEqual(0);
					expect(snakePart.y).toBeLessThan(fieldSize);
				});
			});
		});

		it('should spawn snake with the passed coordinates', () => {
			const fieldSize = 20;
			const snakeSize = 3;
			//Use spawnFood here to get snake head coords, it's all the same random =)
			for (let i = 0; i < 100; i++) {
				const coords = utils.spawnFood(fieldSize);
				const snake = utils.createSnake(fieldSize, snakeSize, coords.x, coords.y);
				expect(snake[0]).toEqual(coords);
			}
		});
	});

	describe('spawnFood', () => {
		it('should spawn a food piece within a field', () => {
			const fieldSize = 20;
			for (let i = 0; i < 100; i++) {
				const food = utils.spawnFood(fieldSize);
				expect(food.x).toBeGreaterThanOrEqual(0);
				expect(food.x).toBeLessThan(fieldSize);
				expect(food.y).toBeGreaterThanOrEqual(0);
				expect(food.y).toBeLessThan(fieldSize);
			}
		});
	});

	describe('updateField', () => {
		it('should create a square array with empty values', () => {
			//Test multiple sizes
			[1, 5, 10, 20, 50].forEach(size => {
				//Result should be an array of n rows each containing n values
				const result = utils.updateField(size);
				expect(result.length).toEqual(size);
				result.forEach(row => {
					expect(row.length).toEqual(size);
					row.forEach(item => expect(item).toEqual(TYPES.TYPE_EMPTY));
				});
			});
		});

		it('should contain a snake (if passed)', () => {
			const size = 10;
			const snakeSize = 3;
			const snake = utils.createSnake(size, snakeSize);
			const result = utils.updateField(size, snake);
			snake.forEach(snakeItem => {
				expect(result[snakeItem.x][snakeItem.y]).toEqual(TYPES.TYPE_SNAKE);
			});
		});

		it('should contain food (if passed)', () => {
			const size = 10;
			for (let i = 0; i < 100; i++) {
				const food = utils.spawnFood(size);
				const result = utils.updateField(size, null, food);
				expect(result[food.x][food.y]).toEqual(TYPES.TYPE_FOOD);
			}
		});

		it('should contain both snake and food', () => {
			const size = 10;
			const snakeSize = 3;
			//100 iterations to make sure  that food will not be accidentialy created on a snake's position
			for (let i = 0; i < 100; i++) {
				const snake = utils.createSnake(size, snakeSize);
				const food = utils.spawnFood(size, snake);
				const result = utils.updateField(size, snake, food);
				expect(result[food.x][food.y]).toEqual(TYPES.TYPE_FOOD);
				snake.forEach(snakeItem => {
					expect(result[snakeItem.x][snakeItem.y]).toEqual(TYPES.TYPE_SNAKE);
				});
			}
		});
	});

	describe('moveSnake', () => {
		const fieldSize = 10;
		const snakeSize = 3;
		let snake;
		let result;
		beforeEach(() => {
			snake = utils.createSnake(fieldSize, snakeSize);
		});

		it('should be pure', () => {
			expect(utils.moveSnake(snake)).not.toBe(snake);
		});

		it('should grow snake if received truthy `expand` value', () => {
			expect(utils.moveSnake(snake, DIRECTIONS.UP, true).length).toEqual(snake.length + 1);
		});

		it('should not move snake if no direction provided', () => {
			expect(utils.moveSnake(snake)).toEqual(snake);
		});


		it('should move snake up', () => {
			expect(utils.moveSnake(snake, DIRECTIONS.UP)).toEqual(snake.map(({ x, y }) => ({ x, y: y - 1 })));
		});

		it('should move snake left', () => {
			const resultSnake = utils.moveSnake(snake, DIRECTIONS.LEFT);
			//Head should turn to the left
			expect(resultSnake[0]).toEqual({ x: snake[0].x - 1, y: snake[0].y });
			//Remaining body should be the same as before the move (except the last segment)
			expect(resultSnake.slice(1)).toEqual(snake.slice(0, -1));
		});

		it('should move snake right', () => {
			const resultSnake = utils.moveSnake(snake, DIRECTIONS.RIGHT);
			//Head should turn to the left
			expect(resultSnake[0]).toEqual({ x: snake[0].x + 1, y: snake[0].y });
			//Remaining body should be the same as before the move (except the last segment)
			expect(resultSnake.slice(1)).toEqual(snake.slice(0, -1));
		});
	});

	describe('canChangeDirection', () => {
		it('should allow all valid direction pairs', () => {
			const cd = utils.canChangeDirection;
			expect(cd(DIRECTIONS.UP, DIRECTIONS.UP)).toEqual(true);
			expect(cd(DIRECTIONS.UP, DIRECTIONS.LEFT)).toEqual(true);
			expect(cd(DIRECTIONS.UP, DIRECTIONS.RIGHT)).toEqual(true);

			expect(cd(DIRECTIONS.LEFT, DIRECTIONS.LEFT)).toEqual(true);
			expect(cd(DIRECTIONS.LEFT, DIRECTIONS.UP)).toEqual(true);
			expect(cd(DIRECTIONS.LEFT, DIRECTIONS.DOWN)).toEqual(true);

			expect(cd(DIRECTIONS.RIGHT, DIRECTIONS.RIGHT)).toEqual(true);
			expect(cd(DIRECTIONS.RIGHT, DIRECTIONS.UP)).toEqual(true);
			expect(cd(DIRECTIONS.RIGHT, DIRECTIONS.DOWN)).toEqual(true);

			expect(cd(DIRECTIONS.DOWN, DIRECTIONS.DOWN)).toEqual(true);
			expect(cd(DIRECTIONS.DOWN, DIRECTIONS.LEFT)).toEqual(true);
			expect(cd(DIRECTIONS.DOWN, DIRECTIONS.RIGHT)).toEqual(true);
		});

		it('should disallow all invalid direction pairs', () => {
			const cd = utils.canChangeDirection;
			expect(cd(DIRECTIONS.UP, DIRECTIONS.DOWN)).toEqual(false);
			expect(cd(DIRECTIONS.DOWN, DIRECTIONS.UP)).toEqual(false);
			expect(cd(DIRECTIONS.LEFT, DIRECTIONS.RIGHT)).toEqual(false);
			expect(cd(DIRECTIONS.RIGHT, DIRECTIONS.LEFT)).toEqual(false);
		});
	});

	describe('canPerformMove', () => {
		const fieldSize = 10;
		const snakeSize = 3;

		it('should return `false` if called with no arguments', () => {
			expect(utils.canPerformMove()).toEqual(false);
		});

		it('should return true if the move is valid', () => {
			const snake = utils.createSnake(fieldSize, snakeSize);
			expect(utils.canPerformMove(fieldSize, snake, DIRECTIONS.UP)).toEqual(true);
		});

		it('should return false if the move is invalid (turn to self)', () => {
			const snake = utils.createSnake(fieldSize, snakeSize);
			expect(utils.canPerformMove(fieldSize, snake, DIRECTIONS.DOWN)).toEqual(false);
		});
	});

	describe('willEatFood', () => {
		it('should return false when no args provided', () => {
			expect(utils.willEatFood()).toBe(false);
		});

		it('should return false when no args provided', () => {
			expect(utils.willEatFood(utils.createSnake(10, 5))).toBe(false);
		});

		it('should return false when the snake`s path is clear (no food)', () => {
			expect(utils.willEatFood(utils.createSnake(10, 5), DIRECTIONS.UP)).toBe(false);
		});

		it('should return false when the snake`s path is clear (distant food)', () => {
			const snake = utils.createSnake(10, 5);
			expect(utils.willEatFood(snake, DIRECTIONS.UP, { x: snake.x, y: snake.y - 2 })).toBe(false);
			expect(utils.willEatFood(snake, DIRECTIONS.UP, { x: snake.x - 1, y: snake.y })).toBe(false);
			expect(utils.willEatFood(snake, DIRECTIONS.UP, { x: snake.x + 1, y: snake.y })).toBe(false);
		});

		it('should return true when snake has food right next to its head (direction-wise)', () => {
			const snake = utils.createSnake(10, 5);
			expect(utils.willEatFood(snake, DIRECTIONS.UP, { x: snake[0].x, y: snake[0].y - 1 })).toBe(true);
		});
	});
});