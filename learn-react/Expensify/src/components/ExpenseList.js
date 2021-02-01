import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseListItem';
import selectExpense from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => (
            <ExpenseItem {...expense} key={expense.id} />
        ))}
    </div>
);

const mapStateToProps = (state) => ({
    expenses: selectExpense(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList);