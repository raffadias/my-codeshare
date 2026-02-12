import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io com CORS (ajuste para a URL do seu frontend)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Banco de dados temporário em memória (em produção, use Redis)
const rooms = new Map<string, { code: string; language: string }>();

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on(
    "change-language",
    ({ roomId, language }: { roomId: string; language: string }) => {
      const room = rooms.get(roomId) || { code: "" };
      rooms.set(roomId, { ...room, language });

      // Avisa todo mundo na sala sobre a nova linguagem
      socket.to(roomId).emit("language-update", language);
    },
  );

  // 1. Entrar em uma sala específica
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);

    // Se já existir código salvo para essa sala, envia para o novo usuário
    if (rooms.has(roomId)) {
      socket.emit("code-update", rooms.get(roomId));
    }

    console.log(`Usuário ${socket.id} entrou na sala: ${roomId}`);
  });

  // 2. Ouvir alterações de código
  socket.on(
    "send-changes",
    ({
      roomId,
      code,
      language,
    }: {
      roomId: string;
      code: string;
      language: string;
    }) => {
      // Atualiza o estado da sala
      rooms.set(roomId, { code, language });

      // Envia a alteração para TODOS na sala, EXCETO para quem enviou
      socket.to(roomId).emit("code-update", { code, language });
    },
  );

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
