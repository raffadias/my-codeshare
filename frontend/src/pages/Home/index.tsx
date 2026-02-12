import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import "./styles.css";

export function HomePage() {
  const navigate = useNavigate();

  const createNewRoom = () => {
    const id = nanoid(10);
    navigate(`/room/${id}`);
  };

  return (
    <main>
      <h1>My Codeshare</h1>
      <button onClick={createNewRoom}>Criar Nova Sala</button>
    </main>
  );
}
