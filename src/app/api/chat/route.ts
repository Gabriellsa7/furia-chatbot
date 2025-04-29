import { NextRequest, NextResponse } from "next/server";

// Respostas específicas para palavras-chave
const replies = {
  nextGame:
    "League of Legends (LoL): 03 de maio de 2025 às 13h: FURIA vs. RED Canids , 11 de maio de 2025 às 10h: FURIA vs. Fluxo W7M",
  players:
    "O time atual da FURIA CS:GO é: KSCERATO, yuurih, sidde, molodoy, mareks galinskis, FalleN. \n O time atual da FURIA de VALORANT é: raafa, heat, pryze, Khalil, havoc, mwzera. \n O time atual da FURIA de League of Legends é: Guigo, Tatuu, JoJo, Ayu, Tutsz.",
  lastResult: "Furia Venceu a Loud no LoL por 2x1 no ultimo dia 27/04",
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

  if (normalizedMessage.includes("ultimo resultado")) {
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
