import { useRef, useContext } from 'react';
import { CartContext } from '../store/shoping-cart-context.jsx';
import CartModal from './CartModal.jsx';

export default function Header() {
  const modal = useRef();
  const { items, clearCart } = useContext(CartContext); 
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleCheckout() {
    clearCart(); 
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        onCheckout={handleCheckout}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}