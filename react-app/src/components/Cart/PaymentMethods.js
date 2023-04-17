import React, { useState } from "react"
export default function PaymentMethods({totalCost}){
    const [paymentMethod, setPaymentMethod] = useState("Imperial Credits")


    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
      };

    const theFunc = (totalCost) => {
      let multiplier = 1
      let prefix = '$'
      if (paymentMethod === 'Republic Credits') {
        multiplier = .75
        prefix = '[RC]'
      } else if (paymentMethod === 'DepletedUranium'){
        multiplier = .025
        prefix = 'lbs'
        return (
              <div className="total-cost">
                <h4>The total cost will be {(totalCost * multiplier).toFixed(2)} {prefix}</h4>
              </div>
        )
      } else if (paymentMethod === 'StarHearts'){
        multiplier = .1
        prefix = '(SH)'
      }

      return (<div className="">
          <div className="total-cost">
        <h4>The total cost will be {prefix}{(totalCost * multiplier).toFixed(2)}</h4>
      </div>
      </div>)
    }

    return (
    <div className="payment-methods">
      <h3>How you'll pay:</h3>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="Imperial Credits"
        checked={paymentMethod === 'Imperial Credits'}
        onChange={handlePaymentChange} />
        <img className="imperial-credit" src='https://www.deviantart.com/sandara/art/Hades-and-Persephone-coins-438574490' />
        Imperial Credits
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="Republic Credits"
        checked={paymentMethod === 'Republic Credits'}
        onChange={handlePaymentChange} />
        Republic Credits
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="DepletedUranium"
        checked={paymentMethod === 'DepletedUranium'}
        onChange={handlePaymentChange} />
        Depleted Uranium
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="StarHearts"
        checked={paymentMethod === 'StarHearts'}
         onChange={handlePaymentChange} />
        Star Hearts
      </label>

      {theFunc(totalCost)}
    </div>
    )
}
