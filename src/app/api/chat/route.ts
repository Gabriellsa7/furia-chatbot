import { NextRequest, NextResponse } from "next/server";

// Respostas específicas para palavras-chave
const replies = {
  nextGame: "O próximo jogo da FURIA é dia 28/04 contra a Team Liquid às 18h!",
  players:
    "O time atual da FURIA CS:GO é: KSCERATO, yuurih, arT, chelo, FalleN.",
  lastResult: "FURIA venceu a MIBR por 2-1 no último jogo!",
  tshirt:
    "Você pode comprar camisetas oficiais no site: https://loja.furia.gg/",
};

// Função de correspondência de mensagem
const matchMessage = (message: string) => {
  const normalizedMessage = message.toLowerCase();

  // Respostas específicas para palavras-chave
  if (normalizedMessage.includes("próximo jogo")) {
    return replies.nextGame;
  }

  if (normalizedMessage.includes("jogadores")) {
    return replies.players;
  }

  if (normalizedMessage.includes("último resultado")) {
    return replies.lastResult;
  }

  if (normalizedMessage.includes("camiseta")) {
    return replies.tshirt;
  }

  // Resposta genérica para qualquer outra mensagem
  return "Desculpe, não entendi. Você pode tentar perguntar sobre o próximo jogo, jogadores ou camisetas.";
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;

  // Obtém a resposta da função de correspondência
  const reply = matchMessage(message);

  // Retorna a resposta ao cliente
  return NextResponse.json({ reply });
}
