import { createContext } from 'react';

export const CartContext = createContext({
    items: [],
});

// video 168
/*

[../assets/context.jpg]
To avoid props drilling, createContext is a solution for it,
it's a way to share data between components without passing props down manually.
It's a way to create a global state.

context value is linked to State is provided to all Components in my application,
components that do need access that do need to change or read the State can directly reach out to that 
context, and therefore also to that state.

creating a folder in src, here i named it store, (name it whatever), is sorta convention, not a technical requirement,.
that those context values are stored in files, that are stored in a folder called store.
Because its your data and state store for the entire application or for multiple components at least.

In this store folder i will create a new file now jsx. i named it here:
shoping-cart-context.jsx
this -context is sorta convention.

import { createContext } from 'react';
i am then storing createContext in a constant of my name, name is up to me, i am putting upperCase C
because this value that is produced by createContext will actually be an object that contains a React component
which we will need later. I can pass a value to createContext that will be used as an initial value that can be
provided to multiple components in your React app, to all the components that will be wrapped by this context.
Value provided can be a number, string, object or array ...

const cartContext = createContext();

next we need to export it: export const cartContext = createContext({});

When wrapping it in the app: <CartContext> it will work like his for react 19 +
But for react 18 or less we need to wrap it in the provider <CartContext.Provider> </CartContext.Provider>


Now, in Cart.jsx, we must import CartContext - import {CartContext} from 'react';
In that same file where we are importing CartContext, where we wanna access that context, we need to import 1 of two hooks, 
depending on the version of react we are using.

import { useContext } from 'react';
or
import { use } from 'react';

Those will help us with getting hold of that context, you can use it to consume some context,
or to access some context from inside a component.
You would use this hook by calling it inside of the component function and store it in a constant variable:
And that would be the value that is in the end provided by this context and will work with that value.

const cartCtx = useContext(CartContext);
or
const cartCtx = use(CartContext);      react 19 +

advantage of using the { use } hook is that it can be used in else if statements like:
if(true){
    const cartCtx = use(CartContext); 
};

now since its in a context we can access the items array inside like:
cartCtx.items

examples: 
export default function Cart({onUpdateItemQuantity })
 {cartCtx.items.length === 0 && <p>No items in cart!</p>}
      {cartCtx.items.length > 0 && (

Even though we are setting a default value in 
expot const CartContext = createContext({
    items: []
});

You also must add a value prop to your  <CartContext.Provider> component:
 <CartContext.Provider value={{items: []}}>

 So we need to set that value prop and also provide our context value in here.
 The default value set when creating the context is only used if a component that was not wrapped by the 
 Provider component tries to access the context value.

 What we can do to reduce code and make it more efficient is to destructure the cartCtx like:

 const { items } = useContext (CartContext);
 so then ill be writting:

export default function Cart({onUpdateItemQuantity })
 {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
*/ 