import { FaCartPlus } from 'react-icons/fa';
import { useGlobalContext } from './GlobalProvider';

const Navbar = () => {
  const { getTotals, cart} = useGlobalContext();
  return (
    <nav>
      <div className='nav-center'>
        <h4>useReducer</h4>
        <div className='nav-container'>
          <FaCartPlus className='cart-icon' />
          <div className='amount-container'>
            <p className='total-amount'>{getTotals(cart).totalAmount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
