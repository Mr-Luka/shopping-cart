import { createContext, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
})















// export const CartContext = createContext({
//     items: [],
//     addItemToCart: () => {}, // this dummy function is to help with autocomplition across the board
//     updateItemQuantity: () => {},
// });

// video 168 ++
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
export const CartContext = createContext({
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

Now we need to connect the value of the CartContext.Provider value with our state, since for now its always an
empty array, 
and that is simple, since the content of our state in App is the same like our CartContext, we will
put the value to be the state of shoppingCart
<CartContext.Provider value={shoppingCart}>

but we are not done yet, because if I just set my entire state object as a value here, I can definitely read it, and
therefore we can use that context here in Cart component for example, but editing the state does not work through context yet.
Instead I am editing the state still by passing props to our components. And of course in a perfect world we want to use Context for 
everything, not just for reading values, but also for updatin those values. So that we also dont have to pass props if we just
wanna update a value. And thats also pretty straightforward to do.
For that Ill go back to manually creating my value:

const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart
}
<CartContext.Provider value={ctxValue}>

Here I have stored my context value in a variable, and its an object, and in there I wanna have an items array which should be my
shoppingCart.items array, and I also want to share a addItemToCart function, so a property called addItemToCart which value should be a function
that does add a new item to the cart, and thankfully we have that function that we made before, that is the handleAddItemToCart function..
And with that we are also exposing this function through context. And therefore any component that can read this context, so any component 
that's in the end wrapped by this provider component ( <CartContext.Provider> )
or that's in a child of a wrapped component, can in the end call this handle addItemToCart function through that addItemToCart property 
in my context value.
So this object ctxValue is a value for our CartContext, and hence now for example, in this <Product> component which wants to be able to add
items to the cart.
And now in the Product.jsx i can get rid of the prop onAddToCart , import CartContext and useContext, 
and inside Product function component store it in a variable:
const cartCtx = useContext(CartContext);
but we can destructure it and be:
const {addItemToCart} = useContext(CartContext);

And now its this function that I want to call here on a button onClick and pass my ID to it.
SUM:
It all works with a help of a context, and we are now using the context not just to provide values that 
can be read (items: shippingCart.items), but also values functions that can be called in order to then change the state the shoppingCart
state, which then is linked to our context because its used as a value in that context.


(to make it easier with autocimplition, i can make dummy function inside my CartContext, see begining of this file)


To make the code leaner and cleaner, I can outsource that whole context related data management, out of the app
component into a separate context component.
In this file, beside exporting and creating CartContext, 
we can also create and share a component function CartContextProvider component function, (name up to me).
The idea is to simply grab all that state management and context value management code from inside the app
component. Starting from where we create the state with useState, including all the functions that added to 
the state, all the way down to where I construct this context value, Ill cut all of that from the 
app component and move that into that CartContextProvider function, so that I am managing my state in there.
For this to work we have to import {useState}, and in this case also: DUMMY_PRODUCTS, 
And with that we are managing the entire state in here and we are constructing this context value here as well in 
this component function.
Its not a real component function yet, we can not use it as such, because we are not returning anyting 
renderable yet.
And what we want to return is my CartContext.Provider component, and value should be set to that ctxValue.
<CartContext.Provider value={ctxValue}></CartContext.Provider>

and now this CartContext.Provider should be wrapped around any value this custom CartContextProvider function component
will be wrapped around.
so in it we should destructure the children prop
function CartContextProvider( {children} ) {

}
and then use that down in our return JSX code to in the end make sure that we wrap this CartContext.Provider with that value,
around any JSX code around any other components, therefore, this shopping CartContextProvider will be wrapped around.
return <CartContext.Provider value={ctxValue}>
    {children}
   </CartContext.Provider>

So Now we can use this CartContextProvider component in our App component and in there import CartContextProvider,
and we can ge rid of any useState, 
and wrap it like this:
function App() {
  
  return (
    <CartContextProvider>
      <Header/>
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}/>
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;

so with that we are still setting up the wrapper here but we of course got rid of all that state management logic here.

*/ 