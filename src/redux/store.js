import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({});

const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  },
  wishlistReducer: {
    wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) ?? [],
  }
};
export const store = createStore(rootReducer, initialStore, composeEnhancers());
