import { createContext, useContext, useState } from 'react'

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }) {

    const [cartItems, setCartItems] = useState([])

    const [saving, setSaving] = useState(0)

    const [delivery, setDelivery] = useState(0)



    const cartQuantity = cartItems.reduce((quantity, item) => {
        return (item.quantity + quantity)
    }, 0)

    function enterSaving(num) {
        setSaving(num)
    }

    function enterDelivery(num) {
        setDelivery(num)
    }
    function getItemQuantity(id) {
        // console.log(cartItems)
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {

                return currItems.map(item => {
                    if (item.id === id) {
                        return { id, quantity: item.quantity + 1 }

                    } else {
                        return item
                    }

                })

            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {

                return currItems.map(item => {
                    if (item.id === id) {
                        return { id, quantity: item.quantity - 1 }

                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)

        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeCart,
            enterSaving,
            enterDelivery,
            cartItems,
            cartQuantity,
            saving,
            delivery
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}