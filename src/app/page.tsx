"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    // Mensagem automática ao abrir
    setMessages([
      {
        sender: "bot",
        text: '🐆 Olá! Eu sou o bot oficial da FURIA! Pergunte algo como "próximos jogos", "jogadores", "último resultado" ou "camiseta".',
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return; // Evita enviar mensagens vazias

    // Adiciona a mensagem do usuário
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      // Chama a API para obter a resposta do bot
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Falha na requisição");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      setInput(""); // Limpa o campo de entrada após o envio
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Ocorreu um erro. Tente novamente mais tarde." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('/furia-logo.jpg'), linear-gradient(to bottom, black, #111827)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">🐆 Chat com a FURIA!</h1>
      <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <div className="overflow-y-auto h-96 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-600 self-end"
                  : "bg-gray-700 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded bg-gray-900 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mande sua pergunta..."
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded font-bold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
