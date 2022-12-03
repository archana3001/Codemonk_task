import { createContext, useContext, useState } from 'react'

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }) {

    const [cartItems, setCartItems] = useState([])

    const [saving, setSaving] = useState(0)

    const [delivery, setDelivery] = useState(0)

    function enterCartIntems(obj) {
        setCartItems([...obj])
    }

    const cartQuantity = cartItems.reduce((quantity, item) => {
        return (item.quantity + quantity)
    }, 0)

    function enterSaving(num) {
        setSaving(num)
        localStorage.setItem("codemonk_saving", saving)

    }

    function enterDelivery(num) {
        setDelivery(num)
        localStorage.setItem("codemonk_delivery", delivery)
    }
    function getItemQuantity(id) {

        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {

                localStorage.setItem("codemonk_cartitems", JSON.stringify([...currItems, { id, quantity: 1 }]))
                return [...currItems, { id, quantity: 1 }]
            } else {

                let updated = currItems.map(item => {
                    if (item.id === id) {

                        return { id, quantity: item.quantity + 1 }

                    } else {


                        return item
                    }

                })

                localStorage.setItem("codemonk_cartitems", JSON.stringify(updated))
                return updated
            }
        })

    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {

                let temp = currItems.filter(item => item.id !== id)

                localStorage.setItem("codemonk_cartitems", JSON.stringify(temp))

                return temp
            } else {


                let temp = currItems.map(item => {
                    if (item.id === id) {
                        return { id, quantity: item.quantity - 1 }

                    } else {
                        return item
                    }
                })

                localStorage.setItem("codemonk_cartitems", JSON.stringify(temp))

                return temp;
            }
        })

    }

    function removeCart(id) {
        setCartItems(currItems => {
            let temp = currItems.filter(item => item.id !== id)

            localStorage.setItem("codemonk_cartitems", JSON.stringify(temp))

            return temp;
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
            enterCartIntems,
            cartItems,
            cartQuantity,
            saving,
            delivery
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}