export const TYPES = {
	TYPE_EMPTY: 0,
	TYPE_SNAKE: 1,
	TYPE_FOOD: 2
};

export const DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

export const BANNED_DIRECTIONS = {
	[DIRECTIONS.DOWN]: DIRECTIONS.UP,
	[DIRECTIONS.UP]: DIRECTIONS.DOWN,
	[DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
	[DIRECTIONS.RIGHT]: DIRECTIONS.LEFT
};

