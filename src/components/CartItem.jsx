import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import '../styles/CartItem.scss'


function CartItem({ name }) {
    // let name = JSON.stringify(data)
    // console.log(name.id)

    const { cartItems, cartQuantity, getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCart,
        saving } = useShoppingCart()

    return (
        <div>
            <div className='cartitem'>
                {/* {name?.id} - */}
                <div className='cartitem-block'>
                    <img src={name.imageUrl} />
                    <div className='cartitem-info'>
                        {'tagline' in name ?
                            <div className='cartitem-tagline'>{name?.tagline}</div> : <></>}
                        <h4>{name?.name}</h4>
                        <h5>{name?.desc}</h5>
                    </div>

                </div>
                <div className='cartitem-block'>
                    {name?.price} $
                </div>
                <div className='cartitem-block'>
                    <button onClick={() => {
                        decreaseCartQuantity(name?.id)
                    }}>
                        {getItemQuantity(name?.id)
                            ? <img src='/icon/minus-active.png' />
                            : <img src='/icon/minus.png' />}
                    </button>

                    <div>{getItemQuantity(name?.id)}</div>

                    <button onClick={() => {
                        increaseCartQuantity(name?.id)
                    }}><img src='/icon/plus.png' /></button>
                </div>
                <div className='cartitem-block'>
                    {(getItemQuantity(name?.id) * name?.price * ((100 - saving) / 100)).toFixed(2)} $
                    <button onClick={() => {
                        removeCart(name?.id)
                    }}><img src='/icon/DELETE.png' /></button>
                </div>

            </div>
            {
                'gift' in name ? <div className='gift-item'>
                    <img className='cart-up' src='/icon/up.png' />

                    <div>

                        <img src={name?.gift.imageUrl} />
                    </div>
                    <div><div className='badge'>GIFT</div>
                        {name?.gift.name}
                    </div>
                    <div>{name?.gift.price} $ </div>
                </div> : <></>
            }
        </div>
    )
}

export default CartItem