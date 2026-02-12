import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CodeEditor } from "../../components/CodeEditor";

// ... (configurações anteriores do editor)

export function RoomPage() {
  // Pega o ID da URL: /room/xyz-123 -> roomId = "xyz-123"
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      const socket = io("http://localhost:3001");
      socket.emit("join-room", roomId);
    }
  }, [roomId]);

  return (
    <div>
      <CodeEditor roomId={roomId || ""} />
    </div>
  );
}
