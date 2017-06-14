import React from 'react';
const Button = ({click, disabled, children}) => {
	const onClick = (...args)=>!disabled && click(...args);
	return <button className="Button" onClick={onClick} disabled={disabled}>{children}</button>
};
export default Button;