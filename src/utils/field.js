import {TYPES, DIRECTIONS, BANNED_DIRECTIONS} from './constants';

const getRandomCoordinate = (fieldSize) => Math.round(Math.random() * (fieldSize - 1));

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
	return snakeCoords;
};


export const spawnFood = (fieldSize) => {
	const x = getRandomCoordinate(fieldSize);
	const y = getRandomCoordinate(fieldSize);
	return {x, y};
};

export const updateField = (size, snake, food) => {
	let field = createField(size);
	field[food.x][food.y] = TYPES.TYPE_FOOD;
	for (let i = 0; i < snake.length; i++) {
		field[snake[i].x][snake[i].y] = TYPES.TYPE_SNAKE;
	}
	return field;
};

export const moveSnake = (snake, newDirection, oldDirection) => {
	if (BANNED_DIRECTIONS[newDirection] === oldDirection) {
		return false;
	}
	//Remove tail
	snake.pop();
	const head = snake[0];
	//Add new value before the head
	switch (newDirection) {
		case DIRECTIONS.UP: {
			snake.unshift({x: head.x, y: head.y - 1});
			break;
		}
		case DIRECTIONS.DOWN: {
			snake.unshift({x: head.x, y: head.y + 1});
			break;
		}
		case DIRECTIONS.LEFT: {
			snake.unshift({x: head.x - 1, y: head.y});
			break;
		}
		case DIRECTIONS.RIGHT: {
			snake.unshift({x: head.x + 1, y: head.y});
			break;
		}
	}
	return snake;
};
