import React from 'react';
import PropTypes from 'prop-types';
const Button = ({click, disabled, children}) => {
	const onClick = (...args)=>!disabled && click(...args);
	return <button className="Button" onClick={onClick} disabled={disabled}>{children}</button>
};

Button.propTypes =  {
	click: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.string.isRequired
};

export default Button;