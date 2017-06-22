import {BANNED_DIRECTIONS, DIRECTIONS, TYPES} from "./constants";

const getRandomCoordinate = (fieldSize) => Math.round(Math.random() * (fieldSize - 1));

const getNewSnakeHead = (snake, direction) => {
	const head = snake[0];
	switch (direction) {
		case DIRECTIONS.UP: {
			return { x: head.x, y: head.y - 1 };
		}
		case DIRECTIONS.DOWN: {
			return { x: head.x, y: head.y + 1 };
		}
		case DIRECTIONS.LEFT: {
			return { x: head.x - 1, y: head.y };
		}
		case DIRECTIONS.RIGHT: {
			return { x: head.x + 1, y: head.y };
		}
		default: {
			return { x: head.x, y: head.y };
		}
	}
};

const compareCoords = (item1, item2) => item1.x === item2.x && item1.y === item2.y;

const createField = (size) => {
	let field = [];
	for (let i = 0; i < size; i++) {
		field[i] = [];
		for (let j = 0; j < size; j++) {
			field[i][j] = TYPES.TYPE_EMPTY;
		}
	}
	return field;
};

export const createSnake = (fieldSize, length) => {
	const headPos = Math.floor(fieldSize / 2);
	let snakeCoords = [];
	for (let i = 0; i < length; i++) {
		snakeCoords.push({ x: headPos, y: headPos - i });
	}
	return snakeCoords.reverse();
};


export const spawnFood = (fieldSize) => {
	const x = getRandomCoordinate(fieldSize);
	const y = getRandomCoordinate(fieldSize);
	return { x, y };
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
	if (!snake) {
		return false;
	}
	const newHead = getNewSnakeHead(snake, direction);
	return newHead.x >= 0 && newHead.x < fieldSize && newHead.y >= 0 && newHead.y < fieldSize && !snake.slice(0, -1).some((snakePiece) => compareCoords(snakePiece, newHead));
};
export const willEatFood = (snake, direction, food) => {
	const newHead = getNewSnakeHead(snake, direction);
	return food ? compareCoords(newHead, food) : false;
};
