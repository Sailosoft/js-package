import { useEffect, useState } from "react";

export default function WelcomePage() {
  const [hello, setHello] = useState("");
  useEffect(() => {
    fetch("http://localhost:8090/api/authentication/hello").then((response) => {
      response.text().then((text) => {
        setHello(text);
      });
    });
  }, []);
  return (
    <div>
      <h1>Welcome to Idle Penguin!</h1>
      <p>{hello}</p>
      <button onClick={() => alert("Starting game...")}>Start Game</button>
    </div>
  );
}
