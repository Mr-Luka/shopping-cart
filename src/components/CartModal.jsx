import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

const CartModal = forwardRef(function Modal({ title, actions, onCheckout }, ref) {
  const dialog = useRef();
  const [showThankYou, setShowThankYou] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setShowThankYou(false); // reset thank you message on reopen
      dialog.current.showModal();
    },
  }));

  function handleCheckoutClick() {
  onCheckout();              // Clear the cart
  setShowThankYou(true);     // Show message

  setTimeout(() => {
    dialog.current.close();  // Close modal after 2s
  }, 2000);
}

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>

      {showThankYou ? (
        <p style={{ textAlign: 'center', padding: '1rem' }}>🎉 Thanks for your purchase!</p>
      ) : (
        <>
          <Cart />
          <form method="dialog" id="modal-actions">
            {actions}
            <button type="button" onClick={handleCheckoutClick}>
              Confirm Purchase
            </button>
          </form>
        </>
      )}
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
