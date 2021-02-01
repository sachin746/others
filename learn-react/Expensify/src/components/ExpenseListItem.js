import React from 'react';
import {connect} from 'react-redux';
import {removeExpence} from '../actions/expenses';

const ExpenseItem = ({dispatch,id,description,amount,createdAt}) => (
    <div>
        <h3>{description}</h3>
        <p>{amount} - {createdAt}</p>
        <button onClick={()=>{
          dispatch(removeExpence({id}));  
        }}>Remove</button>
    </div>
);

export default connect()(ExpenseItem);