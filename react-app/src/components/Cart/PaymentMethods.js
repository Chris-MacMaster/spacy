import React, { useState } from "react"
export default function PaymentMethods({totalCost}){
    const [paymentMethod, setPaymentMethod] = useState("Federal Credits")


    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
      };

    return (
    <div className="payment-methods">
      <h3>How you'll pay:</h3>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="Imperial Credits"
        checked={paymentMethod === 'Imperial Credits'}
        onChange={handlePaymentChange} />
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
        DepletedUranium
      </label>
      <label className="payment-type">
        <input type="radio"
        name="paymentMethod"
        value="StarShards"
        checked={paymentMethod === 'StarShards'}
         onChange={handlePaymentChange} />
        StarShards
      </label>

      <div className="total-cost">
        <h4>The total cost will be ${totalCost}</h4>
      </div>
    </div>
    )
}
