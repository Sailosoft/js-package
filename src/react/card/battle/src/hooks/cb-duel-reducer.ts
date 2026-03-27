import { CBCardLayout } from "../interfaces/cb-card.interface.ts";

type DuelAction =
  | { type: "DRAW_CARD" }
  | { type: "PLAY_CARD"; cardId: string; slotIndex: number }
  | { type: "DESTROY_CARD"; slotId: string; field: "monster" | "spelltrap" }
  | { type: "SET_BOARD"; layout: CBCardLayout }
  | { type: "SHUFFLE_DECK" };

export function cbDuelReducer(
  state: CBCardLayout,
  action: DuelAction,
): CBCardLayout {
  switch (action.type) {
    case "DRAW_CARD": {
      if (state.deck.cards.length === 0) return state;
      const [drawn, ...remaining] = state.deck.cards;
      return {
        ...state,
        deck: { ...state.deck, cards: remaining },
        hand: { cards: [...state.hand.cards, drawn] },
      };
    }

    case "SHUFFLE_DECK": {
      const shuffled = [...state.deck.cards].sort(() => Math.random() - 0.5);
      return {
        ...state,
        deck: { ...state.deck, cards: shuffled },
      };
    }

    case "PLAY_CARD": {
      const cardIndex = state.hand.cards.findIndex(
        (c) => c.id === action.cardId,
      );
      if (cardIndex === -1) return state;

      const card = state.hand.cards[cardIndex];
      const fieldKey = card.type === "monster" ? "monster" : "spelltrap";
      const targetSlot = state[fieldKey][action.slotIndex];

      if (!targetSlot || targetSlot.status === "occupied") return state;

      // Update hand and field in one atomic step
      const newHand = [...state.hand.cards];
      newHand.splice(cardIndex, 1);

      const newField = [...state[fieldKey]];
      newField[action.slotIndex] = { ...targetSlot, card, status: "occupied" };

      return { ...state, hand: { cards: newHand }, [fieldKey]: newField };
    }

    case "DESTROY_CARD": {
      const slotIndex = state[action.field].findIndex(
        (s) => s.id === action.slotId,
      );
      const card = state[action.field][slotIndex]?.card;

      if (!card) return state;

      const newField = [...state[action.field]];
      newField[slotIndex] = {
        ...newField[slotIndex],
        card: undefined,
        status: "empty",
      };

      return {
        ...state,
        [action.field]: newField,
        graveyard: {
          ...state.graveyard,
          cards: [card, ...state.graveyard.cards],
        },
      };
    }

    default:
      return state;
  }
}
