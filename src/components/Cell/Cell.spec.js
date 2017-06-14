import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Cell from '../Cell';
import {TYPES} from '../../utils/constants';

describe('Cell', () => {

	it('should render a single cell', () => {
		const wrapper = shallow(<Cell />);
		expect(wrapper.find('div.Cell')).to.have.length(1);
	});

	it('should render with transparent background by default (or when passed TYPE_EMPTY)', () => {
		const wrapper = shallow(<Cell />);
		expect(wrapper.find('div.Cell').prop('style')).to.have.property('backgroundColor', 'transparent');

		const wrapperEmpty = shallow(<Cell value={TYPES.EMPTY}/>);
		expect(wrapperEmpty.find('div.Cell').prop('style')).to.have.property('backgroundColor', 'transparent');
	});

	it('should render with red color of food', () => {
		const wrapper = shallow(<Cell value={TYPES.TYPE_FOOD}/>);
		expect(wrapper.find('div.Cell').prop('style')).to.have.property('backgroundColor', 'red');
	});

	it('should render with black color of snake', () => {
		const wrapper = shallow(<Cell value={TYPES.TYPE_SNAKE}/>);
		expect(wrapper.find('div.Cell').prop('style')).to.have.property('backgroundColor', 'black');
	});

});