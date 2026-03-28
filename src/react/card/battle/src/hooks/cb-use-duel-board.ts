import { useReducer, useCallback, useEffect } from "react";
import { CBCard, CBCardLayout } from "../interfaces/cb-card.interface.ts";
import { cbDuelReducer } from "./cb-duel-reducer.ts";

const HAND_LIMIT = 10;

export const useDuelBoardCB = (initialDeck: CBCard[]) => {
  const initialState: CBCardLayout = {
    monster: Array(5)
      .fill(null)
      .map((_, i) => ({ id: `m-${i}`, type: "monster", status: "empty" })),
    spelltrap: Array(5)
      .fill(null)
      .map((_, i) => ({ id: `st-${i}`, type: "spell", status: "empty" })),
    hand: { cards: [] },
    deck: { id: "deck-1", type: "deck", cards: initialDeck },
    graveyard: { id: "gy-1", type: "graveyard", cards: [] },
    outOfPlay: { id: "oop-1", type: "outOfPlay", cards: [] },
    extraDeck: { id: "ed-1", type: "extraDeck", cards: [] },
  };

  const [layout, dispatch] = useReducer(cbDuelReducer, initialState);

  // Memoized helpers to keep the component clean
  const drawCard = useCallback(() => dispatch({ type: "DRAW_CARD" }), []);
  const shuffleDeck = useCallback(() => dispatch({ type: "SHUFFLE_DECK" }), []);

  const playCard = useCallback(
    (cardId: string, slotIndex: number) =>
      dispatch({ type: "PLAY_CARD", cardId, slotIndex }),
    [],
  );

  const destroyCard = useCallback(
    (slotId: string, isMonster: boolean) =>
      dispatch({
        type: "DESTROY_CARD",
        slotId,
        field: isMonster ? "monster" : "spelltrap",
      }),
    [],
  );

  const canDraw = layout.hand.cards.length < HAND_LIMIT && layout.deck.cards.length > 0

  useEffect(() => {
    shuffleDeck();
  }, []);
  return { layout, drawCard, playCard, destroyCard, shuffleDeck, canDraw };
};
