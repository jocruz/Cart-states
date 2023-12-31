import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(
      action.payload.map((item) => {
        return [item.id, item];
      })
    );
    return { ...state, loading: false, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId); //
    if (item) {
      const newItem = { ...item, amount: item.amount + 1 };
      newCart.set(itemId, newItem);
    }

    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    if (item && item.amount > 1) {
      const newItem = { ...item, amount: item.amount - 1 };
      newCart.set(itemId, newItem);
    } else {
      newCart.delete(itemId);
    }
    console.log(newCart);
    return { ...state, cart: newCart };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    if (item) {
      newCart.delete(itemId);
    }
    return { ...state, cart: newCart };
  }
};

export default reducer;
