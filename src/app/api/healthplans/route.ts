import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.BIOPLANNER_API_KEY || "c9fd1b20-2c9c-496e-8c0b-1d456f51e6cc";
  const diseaseId = 2; // Usando 2 para Psoríase, conforme o código existente

  // Faz uma busca ampla por médicos para coletar todos os convênios
  // Limitando a cidade para evitar uma resposta muito grande, se necessário, ou remover para buscar globalmente
  const url = `https://api.bioplanner.com.br/kira/physicians/${diseaseId}`;

  try {
    const apiResponse = await fetch(url, {
      headers: { "api-key": apiKey },
    });

    if (!apiResponse.ok) {
      console.error("Erro da API Bioplanner (physicians para healthplans):", await apiResponse.text());
      return NextResponse.json(
        { error: `Erro ao buscar médicos para convênios: ${apiResponse.statusText}` },
        { status: apiResponse.status }
      );
    }

    const physicians = await apiResponse.json();
    const healthPlansSet = new Set<string>();

    physicians.forEach((physician: any) => {
      physician.addresses.forEach((address: any) => {
        address.healthPlans.forEach((plan: any) => {
          healthPlansSet.add(plan.name);
        });
      });
    });

    const uniqueHealthPlans = Array.from(healthPlansSet);
    return NextResponse.json(uniqueHealthPlans);
  } catch (error) {
    console.error("Falha ao fazer fetch dos convênios:", error);
    return NextResponse.json(
      { error: "Serviço de busca de convênios indisponível." },
      { status: 500 }
    );
  }
}

