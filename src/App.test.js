import React from "react";
import {shallow} from "enzyme";

import {App} from "./App";
import Field from "./components/Field";
import Button from "./components/Button";

describe('App', () => {
  it('should render a single App div', () => {
    const wrapper = shallow(<App dispatch={() => {
    }}/>);
    expect(wrapper.find('div.App')).toHaveLength(1);
  });

  it('should render a header', () => {
    const wrapper = shallow(<App dispatch={() => {
    }}/>);
    expect(wrapper.find('div.App-header')).toHaveLength(1);
    expect(wrapper.find('div.App-header').text()).toEqual('Snake Game');
  });

  it('should render a Field', () => {
    const wrapper = shallow(<App dispatch={() => {
    }}/>);
    expect(wrapper.find(Field)).toHaveLength(1);
  });

  it('should render Start and Stop buttons', () => {
    const wrapper = shallow(<App dispatch={() => {
    }}/>);
    expect(wrapper.find('.App-controls')).toHaveLength(1);
    expect(wrapper.find('.App-controls').find(Button)).toHaveLength(2);
  });


});