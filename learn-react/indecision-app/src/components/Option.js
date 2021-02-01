import React from 'react';
const Option = (props) => {
    return (
        <div className='option'>
            <p className='option__test'>{props.count}. {props.optiontext}</p>
            <button
                onClick={(e)=>{return props.handledeletesingle(props.optiontext)}}
                className="button button--link"
            >
                Remove
            </button>
        </div>
    )
}
export default Option;