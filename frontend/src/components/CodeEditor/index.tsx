import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import type { OnMount, Monaco } from "@monaco-editor/react";
import "./styles.css";

const socket = io("http://localhost:3001");

const SUPPORTED_LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "HTML", value: "html" },
];

export function CodeEditor({ roomId }: { roomId: string }) {
  const [language, setLanguage] = useState("javascript");
  // Usamos ref para guardar a instância do editor sem causar re-renders
  const editorRef = useRef<Monaco | null>(null);
  const isIncomingChange = useRef(false);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Entra na sala
    socket.emit("join-room", roomId);
  };

  useEffect(() => {
    socket.on("code-update", (newCode: { code: string; language: string }) => {
      const { code } = newCode;
      if (editorRef.current && code !== editorRef.current.getValue()) {
        isIncomingChange.current = true;
        const model = editorRef.current.getModel();
        if (model) {
          editorRef.current.executeEdits("remote-delta", [
            {
              range: model.getFullModelRange(),
              text: code,
              forceMoveMarkers: true,
            },
          ]);
        }

        isIncomingChange.current = false;
      }
    });

    return () => {
      socket.off("code-update");
    };
  }, [roomId]);

  useEffect(() => {
    // Escuta quando outra pessoa muda a linguagem
    socket.on("language-update", (newLanguage: string) => {
      setLanguage(newLanguage);
    });

    return () => {
      socket.off("language-update");
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    // Se a mudança veio do socket, não precisamos enviar de volta
    if (isIncomingChange.current) return;

    const newCode = value || "";
    socket.emit("send-changes", { roomId, code: newCode, language });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);

    // Notifica o servidor
    socket.emit("change-language", {
      roomId,
      language: newLang,
      code: editorRef.current?.getValue() || "",
    });
  };

  return (
    <div>
      <div className="language-selector-wrapper">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-800 text-white p-1 rounded border border-gray-600 outline-none"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <span className="text-gray-400 text-sm px-4">Room: {roomId}</span>
      </div>
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage="typescript"
        language={language}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
