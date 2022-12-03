import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem';
import PincodeFind from '../components/PincodeFind';
import { useShoppingCart } from '../context/ShoppingCartContext'
import data from '../data/data.json'
import '../styles/Cart.scss'

function Cart() {

    // console.log(data);
    const products = data.products;
    const discount = data.discount;
    const pincode = data.pincode;

    // console.log(products)
    const { cartItems, cartQuantity, getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCart,
        saving,
        enterSaving, delivery, enterCartIntems } = useShoppingCart()

    const [cost, setCost] = useState(0)
    const [disc, setDisc] = useState(0)

    let temp = 0
    let discTemp = 0

    // let abc = localStorage.getItem("codemonk_cartitems")
    // console.log(JSON.parse(abc))

    useEffect(() => {
        setCost(temp)
        if (cost > discount.minTotal) {
            enterSaving(discount.discountPercentage)
        }
        setDisc(discTemp);
    });

    useEffect(() => {
        let abc = localStorage.getItem("codemonk_cartitems")

        if (abc === null) {
            enterCartIntems([])

        }
        else {
            let abc1 = JSON.parse(abc)
            // console.log(abc1)

            enterCartIntems(abc1)
        }

    }, [])


    // if (delivery > 0 && cost > 0) {
    //     temp += delivery
    // }
    return (
        <div className='cart-main-cont'>
            <h1>Shopping Cart</h1>
            <div className='cart-main'>
                <div className='cart-navbar'>
                    <div className='cart-navbar-item'>Product</div>
                    <div className='cart-navbar-item'>Price</div>
                    <div className='cart-navbar-item'>Quantity</div>
                    <div className='cart-navbar-item'>Subtotal</div>

                </div>
                {
                    products.map(i => {
                        temp += (getItemQuantity(i.id) * i.price)
                        discTemp += getItemQuantity(i.id) * i.price * (saving) / 100
                        return (
                            <CartItem key={i.id} name={i} />
                        )

                    })
                }

                <div className='cart-foot'>

                    <div className='cart-foot-del'>
                        <PincodeFind pincode={pincode} />
                    </div>
                    <div className='cart-foot-sum'>
                        <div className='sum-row'>Order Summary ({cartQuantity} items)
                        </div>
                        <div className='sum-row'>
                            <div>Subtotal</div> <div>{cost.toFixed(2)}</div>
                        </div>
                        <div className='sum-row'>
                            <div>Total Discount</div> <div>{disc}</div>
                        </div>
                        <div className='sum-row'>
                            <div>Delivery</div> <div>{
                                delivery === -1 ? "Unavailable" : delivery}</div>
                        </div>
                        <div className='sum-row'>
                            <div>Order Total</div>
                            <div>
                                <h2>
                                    {delivery > 0 && cost > 0 ? ((cost * ((100 - saving) / 100)) + delivery).toFixed(2) : (cost * ((100 - saving) / 100)).toFixed(2)}
                                </h2>
                            </div>
                        </div>
                        <div className='sum-row'>
                            <div>CONTINUE SHOPPING </div> <div><button>Checkout</button></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart