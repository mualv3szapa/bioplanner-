import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Pega a URL da requisição para extrair o parâmetro 'cep'
  const { searchParams } = new URL(request.url);
  const cep = searchParams.get("cep");

  // Validação para garantir que o CEP foi enviado e tem 8 dígitos
  if (!cep || !/^\d{8}$/.test(cep)) {
    return NextResponse.json(
      { error: "CEP inválido. Forneça 8 dígitos numéricos." },
      { status: 400 }
    );
  }

  try {
    // O servidor Next.js (aqui no backend) faz a chamada para a API do ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Verifica se a chamada à API externa foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao conectar com o serviço ViaCEP.");
    }

    const data = await response.json();

    // O ViaCEP retorna uma propriedade 'erro' se o CEP não for encontrado
    if (data.erro) {
      return NextResponse.json(
        { error: "CEP não encontrado." },
        { status: 404 }
      );
    }

    // Se tudo deu certo, retorna os dados do endereço para o seu componente no front-end
    return NextResponse.json(data);
  } catch (error) {
    // Captura qualquer outro erro de rede ou falha na execução
    console.error("Erro na API de CEP:", error);
    return NextResponse.json(
      { error: "Serviço de consulta de CEP indisponível no momento." },
      { status: 500 }
    );
  }
}
