import { useReducer, useCallback } from 'react';
import { CBCard, CBCardLayout } from '../interfaces/cb-card.interface.ts';
import { cbDuelReducer } from './cb-duel-reducer.ts';

export const useDuelBoardCB = (initialDeck: CBCard[]) => {
  const initialState: CBCardLayout = {
    monster: Array(5).fill(null).map((_, i) => ({ id: `m-${i}`, type: 'monster', status: 'empty' })),
    spelltrap: Array(5).fill(null).map((_, i) => ({ id: `st-${i}`, type: 'spell', status: 'empty' })),
    hand: { cards: [] },
    deck: { id: 'deck-1', type: 'deck', cards: initialDeck },
    graveyard: { id: 'gy-1', type: 'graveyard', cards: [] },
    outOfPlay: { id: 'oop-1', type: 'outOfPlay', cards: [] },
    extraDeck: { id: 'ed-1', type: 'extraDeck', cards: [] },
  };

  const [layout, dispatch] = useReducer(cbDuelReducer, initialState);

  // Memoized helpers to keep the component clean
  const drawCard = useCallback(() => dispatch({ type: 'DRAW_CARD' }), []);
  
  const playCard = useCallback((cardId: string, slotIndex: number) => 
    dispatch({ type: 'PLAY_CARD', cardId, slotIndex }), []);

  const destroyCard = useCallback((slotId: string, isMonster: boolean) => 
    dispatch({ 
      type: 'DESTROY_CARD', 
      slotId, 
      field: isMonster ? 'monster' : 'spelltrap' 
    }), []);

  return { layout, drawCard, playCard, destroyCard };
};