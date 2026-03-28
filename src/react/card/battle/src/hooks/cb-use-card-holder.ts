import { useState } from "react";
import { CBCardHolder, CBCardType } from "../interfaces/cb-card.interface.ts";

export default function useCardHolderCB({ type } : {
  type: CBCardType;
}) {
  const [card, setCard] = useState<CBCardHolder>({
    id: window.crypto.randomUUID(),
    type: type,
    status: "empty"
  });

  return {
    card,
    setCard
  }
}