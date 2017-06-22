import * as utils from "./utils";
import {TYPES} from "./constants";

describe('utils', () => {

	describe('createSnake', () => {
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
	});

	describe('spawnFood', () => {

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
			const snake = utils.createSnake(size);
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
			for (let i = 0; i < 100; i++) {
				const snake = utils.createSnake(size);
				const food = utils.spawnFood(size);
				const result = utils.updateField(size, snake, food);

				expect(result[food.x][food.y]).toEqual(TYPES.TYPE_FOOD);
				snake.forEach(snakeItem => {
					expect(result[snakeItem.x][snakeItem.y]).toEqual(TYPES.TYPE_SNAKE);
				});
			}
		});
	});

	describe('moveSnake', () => {

	});

	describe('canChangeDirection', () => {

	});

	describe('canPerformMove', () => {

	});

	describe('willEatFood', () => {

	});
});