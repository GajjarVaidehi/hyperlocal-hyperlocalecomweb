const initialState = {
    cartItems: ["item1"],
};


export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST": {
            return {
                ...state,
                wishlistItems: [...state.wishlistItems, action.payload],
            };
        }

        case "DELETE_FROM_WISHLIST": {
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(
                    (obj) => obj.id !== action.payload.id
                ),
            };
        }

        default:
            return state;
    }
};