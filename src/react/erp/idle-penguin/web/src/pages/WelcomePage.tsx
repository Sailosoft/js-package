export default function WelcomePage() {
  return (
    <div>
      <h1>Welcome to Idle Penguin!</h1>
      <p>Click the button below to start your adventure.</p>
      <button onClick={() => alert("Starting game...")}>Start Game</button>
    </div>
  );
}