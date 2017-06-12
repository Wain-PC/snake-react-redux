import {TYPES, DIRECTIONS, BANNED_DIRECTIONS} from './constants';

const getRandomCoordinate = (fieldSize) => Math.round(Math.random() * (fieldSize - 1));

const getNewSnakeHead = (snake, direction) => {
	console.log(snake, direction);
	const head = snake[0];
	switch (direction) {
		case DIRECTIONS.UP: {
			return {x: head.x, y: head.y - 1};
		}
		case DIRECTIONS.DOWN: {
			return {x: head.x, y: head.y + 1};
		}
		case DIRECTIONS.LEFT: {
			return {x: head.x - 1, y: head.y};
		}
		case DIRECTIONS.RIGHT: {
			return {x: head.x + 1, y: head.y};
		}
		default: {
			return {x: head.x, y: head.y};
		}
	}
};

export const createField = (size) => {
	let field = [];
	for (let i = 0; i < size; i++) {
		field[i] = [];
		for (let j = 0; j < size; j++) {
			field[i][j] = TYPES.TYPE_EMPTY;
		}
	}
	return field;
};

export const createSnake = (fieldSize, length = 3) => {
	const headPos = Math.floor(fieldSize / 2);
	let snakeCoords = [];
	for (let i = 0; i < length; i++) {
		snakeCoords.push({x: headPos, y: headPos - i});
	}
	return snakeCoords.reverse();
};


export const spawnFood = (fieldSize) => {
	const x = getRandomCoordinate(fieldSize);
	const y = getRandomCoordinate(fieldSize);
	return {x, y};
};

export const updateField = (size, snake, food) => {
	let field = createField(size);
	if (food) {
		field[food.x][food.y] = TYPES.TYPE_FOOD;
	}
	if (snake) {
		for (let i = 0; i < snake.length; i++) {
			field[snake[i].x][snake[i].y] = TYPES.TYPE_SNAKE;
		}
	}

	return field;
};

export const moveSnake = (snake, direction, expand) => {
	snake = Object.assign([], snake);
	//Remove tail
	if (!expand) {
		snake.pop();
	}
	//Add new value before the head
	snake.unshift(getNewSnakeHead(snake, direction));
	return snake;
};

export const canChangeDirection = (newDirection, oldDirection) => BANNED_DIRECTIONS[newDirection] !== oldDirection;

export const canPerformMove = (fieldSize, snake, direction) => {
	const newHead = getNewSnakeHead(snake, direction);
	return newHead.x >= 0 && newHead.x < fieldSize && newHead.y >= 0 && newHead.y < fieldSize;
};
export const willEatFood = (snake, direction, food) => {
	const newHead = getNewSnakeHead(snake, direction);
	return newHead.x === food.x && newHead.y === food.y;
};
