import React from 'react';


const ExpensifyEdit = (props) => {
    console.log(props);
    return(
    <div>
        <h1>HEllo I am here to edit expense with an id of {props.match.params.id}</h1>
    </div>)

};

export default ExpensifyEdit;