import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CodeEditor } from "../../components/CodeEditor";
import "./styles.css";

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      const socket = io("http://localhost:3001");
      socket.emit("join-room", roomId);
    }
  }, [roomId]);

  return (
    <div className="editor-wrapper">
      <CodeEditor roomId={roomId || ""} />
    </div>
  );
}
