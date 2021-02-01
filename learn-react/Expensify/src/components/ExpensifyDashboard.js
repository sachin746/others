import React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseListFilter from "./ExpenseListFilter";

const ExpensifyDashboard = () => (
    <div>
        <ExpenseListFilter/>
        <ExpenseList/>
    </div>
);

export default ExpensifyDashboard;