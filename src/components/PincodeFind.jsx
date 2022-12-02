import React, { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext';
import '../styles/PincodeFind.scss'

function PincodeFind({ pincode }) {

    const { enterDelivery } = useShoppingCart()
    const inputRef = useRef(null);
    const [deli, setDeli] = useState(null)
    const [cash, setCash] = useState(false)
    const [range, setRange] = useState(null)

    let temp

    function changeAdd(num) {
        setDeli(num)
    }

    function changeCash(bool) {
        setCash(bool)
    }

    function changeRange(str) {
        setRange(str)
    }

    function handleClick() {
        temp = inputRef.current.value
        if (temp in pincode) {
            console.log(pincode[temp])
            changeAdd(pincode[temp].deliveryPrice)
            changeCash(pincode[temp].cashOnDelivery)
            changeRange(pincode[temp].estimatedDays.min + " - " + pincode[temp].estimatedDays.max)
            enterDelivery(pincode[temp].deliveryPrice)
        }
        else {

            changeAdd(-1)
            enterDelivery(-1)
        }

    }

    return (
        <div className='pin-main'>

            <h3>Delivery Availability</h3>
            <div className='pin-inp'>
                <img src='/icon/LOCATION.png' />
                <input ref={inputRef} type='number' ></input>
                <button onClick={handleClick}> change</button>
            </div>
            {
                deli === -1 ? <>no delivery here</> :
                    <div className='pin-options'>
                        {range ? <div>
                            <img className='tick-image' src='/icon/check.png' />
                            {deli === 0 ? 'Free Delivery' : deli}
                        </div> : <></>}
                        {cash ? <div>
                            <img className='tick-image' src='/icon/check.png' />cash on available
                        </div> : <></>}
                        {range ? <div> <img className='tick-image' src='/icon/check.png' /> {range} days expected</div> : <></>
                        }
                    </div>
            }
        </div >
    )
}

export default PincodeFind