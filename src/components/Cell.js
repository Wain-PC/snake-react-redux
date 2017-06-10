import React from 'react';

const Cell = props => {
    const classNames = ['Cell'];
    if (props.active) {
        classNames.push('active');
    }


    return <div className={classNames.join(' ')}></div>
};
export default Cell;