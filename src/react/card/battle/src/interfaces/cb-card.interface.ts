export type CBCardType = "monster" | "spell" | "trap";
export type CBCardHolderStatus = "empty" | "occupied";
export type CBCardStackType = "deck" | "graveyard" | "outOfPlay" | "extraDeck";

export interface CBCardHolder {
  id: string;
  card?: CBCard;
  type: CBCardType;
  status: CBCardHolderStatus;
}

export interface CBCardLayout {
  monster: CBCardHolder[];
  spelltrap: CBCardHolder[];
  deck: CBCardStack<"deck">;
  hand: CBHand;
  graveyard: CBCardStack<"graveyard">;
  outOfPlay: CBCardStack<"outOfPlay">;
  extraDeck: CBCardStack<"extraDeck">;
}

export interface CBCardStack<T extends CBCardStackType> {
  id: string;
  type: T;
  cards: CBCard[];
}

export interface CBCard {
  id: string;
  name: string;
  type: CBCardType;
}

export interface CBHand {
  cards: CBCard[];
}
