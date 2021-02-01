import React from 'react';
import ReactModal from "react-modal";

const OptionModal=(props)=>(
    <ReactModal
    isOpen={props.selectedOption}
    onRequestClose={props.clearoption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className='modal' 
    >
        <h2 className='modal__title'>Selected Option</h2>
        {props.selectedOption&&<p className='modal__body'>{props.selectedOption}</p>}
        <button className='button' onClick={props.clearoption}>Okay</button>
    </ReactModal>
);
 export default OptionModal;