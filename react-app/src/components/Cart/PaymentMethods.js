import React, { useState } from "react"
export default function PaymentMethods({totalCost}){
    const [paymentMethod, setPaymentMethod] = useState("Imperial Credits")


    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
      };

    const theFunc = (totalCost) => {
      let multiplier = 1
      let prefix = '$'
      if (paymentMethod === 'Imperial Credits') {
        multiplier = .105
        prefix = '[IC]'
      } else if (paymentMethod === 'Republic Credits') {
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
      }

      return (<div className="">
          <div className="total-cost">
        <h4>The total cost will be {prefix}{(totalCost * multiplier).toFixed(2)}</h4>
      </div>
      </div>)
    }

    return (
    <div className="payment-methods">
      <p className="pay-how">How you'll pay:</p>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="local"
        checked={paymentMethod === 'local'}
        onChange={handlePaymentChange} />
        <img className="local-currency" src='https://i.imgur.com/QfGSupn.png' alt=""/>
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="Imperial Credits"
        checked={paymentMethod === 'Imperial Credits'}
        onChange={handlePaymentChange} />
        <img className="imperial-credit" src='https://images.nightcafe.studio/jobs/MynFADDjnZKN338yrwgQ/MynFADDjnZKN338yrwgQ--1--g6z3l.jpg?tr=w-1600,c-at_max' alt=""/>
        Imperial Credits
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="Republic Credits"
        checked={paymentMethod === 'Republic Credits'}
        onChange={handlePaymentChange} />
        <img className="imperial-credit" src='https://images.nightcafe.studio/jobs/r4epoSTLJNCb21bQxZ3l/r4epoSTLJNCb21bQxZ3l--1--ssghy.jpg?tr=w-1600,c-at_max' alt=""/>
        Republic Credits
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="DepletedUranium"
        checked={paymentMethod === 'DepletedUranium'}
        onChange={handlePaymentChange} />
        <img className="imperial-credit" src='https://m.media-amazon.com/images/I/31RsALNt1JL._AC_.jpg' alt=""/>
        Depleted Uranium
      </label>
      {theFunc(totalCost)}
    </div>
    )
}
