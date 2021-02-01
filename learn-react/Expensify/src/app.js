import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import AppRouter from "./routers/AppRouter"
import configStore from './store/configStore';
import {addExpense,removeExpence,editExpense} from "./actions/expenses";
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses'
import "normalize.css/normalize.css";
import "./stylesheet/styles.scss";

const store=configStore();
store.dispatch(addExpense({description:"water bill",amount:1000}));
store.dispatch(addExpense({description:"bill" ,amount:3000}));

store.dispatch(addExpense({description:"Rent",amount:1999,createdAt:109050}));

const state=store.getState();
const visibleExpenses=getVisibleExpenses(state.expenses,state.filters)

console.log(visibleExpenses);
const jsx=(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));