import React from "react";
import Option from "./Option";
const Options = (props) => {
    return (
        <div>
            <div className='widget-header'>
                <h3 className='widget-header__title'>Your Option</h3>
                <button
                    className='button button--link'
                    onClick={props.handledeleteall}
                >
                    Remove all
            </button>
            </div>
            {props.options.length === 0 && <p className='widget__message'>Please add an option to get started</p>}
            {
                props.options.map((option,index) => {
                    return <Option
                        key={option}
                        optiontext={option}
                        count={index+1}
                        handledeletesingle={props.handledeletesingle}
                    />
                })
            }
        </div>);
}

export default Options;