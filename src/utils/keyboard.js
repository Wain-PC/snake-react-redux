import {DIRECTIONS} from './constants';

const getDirectionFromKeyEvent = (e) => {
	switch (e.keyCode) {
		case 37:
			return DIRECTIONS.LEFT;
		case 38:
			return DIRECTIONS.UP;
		case 39:
			return DIRECTIONS.RIGHT;
		case 40:
			return DIRECTIONS.DOWN;
	}
};

export default (cb) => document.addEventListener('keydown', (e) => cb(getDirectionFromKeyEvent(e)));