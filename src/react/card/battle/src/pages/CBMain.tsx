import CBBoard from "../components/board/CBBoard.tsx";
import { CBCard } from "../interfaces/cb-card.interface.ts";

export default function CBMain() {
  const initialCards = Array(20)
    .fill(null)
    .map(
      (_): CBCard => ({
        id: `card-${Math.random().toString(36).substr(2, 9)}`,
        name: `Card ${Math.floor(Math.random() * 100)}`,
        type: Math.random() > 0.5 ? "monster" : "spell",
      }),
    );
  return (
    <div>
      <h1>Card Battle</h1>
      <CBBoard initialCards={initialCards} />
    </div>
  );
}
