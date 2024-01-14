import React, { useEffect, useState } from 'react'
import "./cartstyle.css"
import { useDispatch, useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import { addItem, clearCart, deleteItem, removeSingleItem } from '../redux/slice/cartSlice';


const CartDetails = () => {
    const { cart } = useSelector(state => {

        console.log(state)
        return state.cartData
    })


    const [cartTotal, setCartTotal] = useState({ totalPrice: 0, totalItems: 0 });

    const dispatch = useDispatch();

    // add to cart
    const handleIncrement = (e) => {
        dispatch(addItem(e))
        toast.success("Item Added In Your Cart")

    }


    // remove to cart
    const handleDeleteItem = (e) => {
        console.log(e);
        dispatch(deleteItem(e))
        toast.success("Item Removed From Your Cart")
    }

    // remove single item 
    const handleSingleDecrement = (e) => {
        dispatch(removeSingleItem(e))
        toast.success("Item Removed From Your Cart")
    }

    // empty cart
    const emptycart = () => {
        dispatch(clearCart())
        toast.success("Your Cart is Empty")

    }

    // count total price
    useEffect(() => {
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.qnty), 0);
        const totalItems = cart.reduce((total, item) => total + item.qnty, 0);
        setCartTotal({ totalPrice, totalItems });
        console.log(totalPrice, totalItems);
    }, [cart]);

    return (
        <>
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-white m-0'>Cart Calculation{cart.length > 0 ? `(${cart.length})` : ""}</h5>
                                {
                                    cart.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
                                        onClick={emptycart}
                                    ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                        : ""
                                }
                            </div>

                        </div>
                        <div className="card-body p-0">
                            {
                                cart.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>

                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                                                <th className='text-right'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((data, index) => {
                                                    return (
                                                        <>
                                                            <tr>

                                                                <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                                                                <td><div className='product-name'><p>{data.dish}</p></div></td>
                                                                <td>{data.price}</td>
                                                                <td>
                                                                    <div className="prdct-qty-container">
                                                                        <button className='prdct-qty-btn' type='button'
                                                                            onClick={data.qnty <= 1 ? () => handleDeleteItem(data.id) : () => handleSingleDecrement(data)}
                                                                        >
                                                                            <i className='fa fa-minus'></i>
                                                                        </button>
                                                                        <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                                                        <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                                                            <i className='fa fa-plus'></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className='text-right'>₹ {data.qnty * data.price}</td>
                                                                <td className='text-right'>
                                                                    <button className='prdct-delete'
                                                                        onClick={() => handleDeleteItem(data.id)}
                                                                    ><i className='fa fa-trash-alt'></i></button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}>&nbsp;</th>
                                                <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{cartTotal.totalItems}</span></th>
                                                <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {cartTotal.totalPrice}</span></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails


