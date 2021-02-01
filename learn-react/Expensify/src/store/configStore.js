import { createStore, combineReducers } from "redux";
import expenseReducer from '../reducers/expensesReducers';
import filterReducer from '../reducers/filterReducers';

export default () => {
    //store
    const store = createStore(
        combineReducers({
            expenses: expenseReducer,
            filters: filterReducer
        })
    );
    return store;
}

