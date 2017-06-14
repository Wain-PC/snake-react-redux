import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Button from '../Button';

describe('Button', () => {

	it('should render a button', () => {
		const wrapper = shallow(<Button />);
		expect(wrapper.find('button')).to.have.length(1);
	});

	it('should render a button with empty text if no props passed', () => {
		const wrapper = shallow(<Button />);
		expect(wrapper.find('button').text()).to.equal('');
		expect(wrapper.find('button').prop('disabled')).to.not.exist;
	});

	it('should render an enabled button be default', () => {
		const wrapper = shallow(<Button />);
		expect(wrapper.find('button').text()).to.equal('');
	});

	it('should render a button with text passed as a child', () => {
		const wrapper = shallow(<Button>Text!</Button>);
		expect(wrapper.find('button').text()).to.equal('Text!');
	});

	it('should render a disabled button', () => {
		const wrapper = shallow(<Button disabled={true}>Text!</Button>);
		expect(wrapper.find('button').prop('disabled')).to.exist;
	});

	it('should perform a click and run a passed callback', () => {
		const onClick = sinon.spy();
		const wrapper = shallow(<Button click={onClick}>Text!</Button>);
		wrapper.find('button').simulate('click');
		expect(onClick).to.have.property('callCount', 1);
	});

	it('should NOT perform a click on a disabled element', () => {
		const onClick = sinon.spy();
		const wrapper = shallow(<Button disabled={true} click={onClick}>Text!</Button>);
		wrapper.find('button').simulate('click');
		expect(onClick).to.have.property('callCount', 0);
	});


});