import {useSelector} from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss'


const CheckoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
    <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>

       <div>
       {
        cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}  />
))}
        <span className='Total'>Total: ${cartTotal}</span>

       </div>
    </div>
    )
}

export default CheckoutPage;