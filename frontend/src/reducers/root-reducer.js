import {combineReducers} from "redux";

import perfumeReducer from "../reducers/perfume-reducer";

const rootReducer = combineReducers({
    perfume: perfumeReducer,
});

export default rootReducer;