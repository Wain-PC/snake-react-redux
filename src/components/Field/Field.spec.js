import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Field from '../Field';
import Cell from '../Cell';
import {createField} from '../../utils/utils';

describe('Field', () => {

	it('should render a single field', () => {
		const size = 10;
		const wrapper = shallow(<Field size={size}/>);
		expect(wrapper.find('div.Field')).to.have.length(1);
	});

	it('should render N rows, where N === field size', () => {
		const wrapper = shallow(<Field size={5} />);
		expect(wrapper.find('div.Field__row')).to.have.length(5);
	});



	it('should render N^2 cells, where N === field size', () => {
		const wrapper = shallow(<Field size={5} />);
		expect(wrapper.find(Cell)).to.have.length(25);
	});


});