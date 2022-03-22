import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer"

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  wishlistReducer: wishlistReducer,
});

export default rootReducer;
