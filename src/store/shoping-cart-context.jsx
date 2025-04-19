import { createContext } from 'react';

export const CartContext = createContext({
    items: [],
});

// video 168
/*

[../assets/context.jpg]
When wrapping it in the app: <CartContext> it will work like his for react 19 +
But for react 18 or less we need to wrap it in the provider <CartContext.Provider> </CartContext.Provider>
*/