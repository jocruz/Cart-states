import CartItem from './CartItem';
import { useGlobalContext } from './GlobalProvider';
import cartItems from './data';

const CartContainer = () => {
  const {clear, cart, getTotals} = useGlobalContext()
  const cartArray = Array.from(cart.entries())
  console.log(cartArray)
  if (cartArray.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          const [id,items] = cartItem
          return <CartItem key={id} {...items} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
            total <span>{getTotals(cart).totalCost}</span>
          </h5>
        </div>
        <button
          className='btn btn-hipster' onClick={clear}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
