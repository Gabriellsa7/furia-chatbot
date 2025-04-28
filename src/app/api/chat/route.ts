import { NextRequest, NextResponse } from "next/server";

// Respostas específicas para palavras-chave
const replies = {
  nextGame:
    "VALORANT: 18 de abril de 2025 às 21h: FURIA vs. MIBR, League of Legends (LoL): 03 de maio de 2025 às 13h: FURIA vs. RED Canids , 11 de maio de 2025 às 10h: FURIA vs. Fluxo W7M",
  players:
    "O time atual da FURIA CS:GO é: KSCERATO, yuurih, arT, chelo, FalleN. \n O time atual da FURIA de VALORANT é: f4stzz, mwzera, frz, Khalil, aspas. \n O time atual da FURIA de League of Legends é: Route, esA, Robo, Mari, DyNquedo.",
  lastResult: "FURIA venceu a MIBR por 2-1 no último jogo!",
  tshirt:
    "Você pode comprar camisetas oficiais no site: https://loja.furia.gg/",
};

// Função de correspondência de mensagem
const matchMessage = (message: string) => {
  const normalizedMessage = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Respostas específicas para palavras-chave
  if (normalizedMessage.includes("proximos jogos")) {
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
