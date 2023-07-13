import React, { useState, useEffect, useRef } from "react";
import { payments } from "@square/web-sdk";

export default function PaymentForm() {
  const [cardErrors, setCardErrors] = useState({});
  const [instance, setInstance] = useState(null);
  const cardElementRef = useRef();

  useEffect(() => {
    async function initializeSquare() {
      try {
        const paymentObject = payments("sandbox-sq0idb-maUa17QdClk-Ayfpb5XArA");
        const card = await paymentObject.card();
        card.attach(cardElementRef.current);
        setInstance(card);
      } catch (error) {
        console.error('Error initializing Square:', error);
        setCardErrors(error);
      }
    }

    if (cardElementRef.current) {
      initializeSquare();
    }
  }, [cardElementRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!instance) {
      return;
    }

    const result = await instance.tokenize();

    if (result.status === "OK") {
      console.log("Card tokenization successful, token is: ", result.token);
    } else {
      console.log("Card tokenization failed: ", result.errors);
      setCardErrors(result.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div ref={cardElementRef} />
      <button type="submit">Submit Payment</button>
      {cardErrors && <div>Error: {JSON.stringify(cardErrors)}</div>}
    </form>
  );
}