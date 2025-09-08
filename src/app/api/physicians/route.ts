import { NextResponse } from "next/server";

// Tipos da API para referência
type PhysicianAddress = {
  id: number;
  street: string;
  number: string;
  district: string;
  city: { name: string; state: { id: string } };
  cep: string;
  distance?: number; // Nossa distância mockada
};

type Physician = {
  id: number;
  name: string;
  addresses: PhysicianAddress[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const healthplan = searchParams.get("healthplan"); // Convênio

  // Validação
  if (!city) {
    return NextResponse.json(
      { error: "A cidade é obrigatória." },
      { status: 400 }
    );
  }

  // ATENÇÃO: Substitua '2' pelo ID correto para Psoríase
  const diseaseId = 2;
  // IMPORTANTE: Mova sua chave para variáveis de ambiente (.env.local) no futuro
  const apiKey = process.env.BIOPLANNER_API_KEY || "c9fd1b20-2c9c-496e-8c0b-1d456f51e6cc";

  // Monta os filtros da API
  const filters = [{ by: "city", value: city }];
  // Adiciona o filtro de convênio apenas se ele for fornecido
  if (healthplan) {
    filters.push({ by: "healthplan", value: healthplan });
  }

  const url = `https://api.bioplanner.com.br/kira/physicians/${diseaseId}?filter=${JSON.stringify(
    filters
  )}`;

  try {
    const apiResponse = await fetch(url, {
      headers: { "api-key": apiKey },
    });

    if (!apiResponse.ok) {
      console.error("Erro da API Bioplanner:", await apiResponse.text());
      return NextResponse.json(
        { error: `Erro ao buscar médicos: ${apiResponse.statusText}` },
        { status: apiResponse.status }
      );
    }

    let physicians: Physician[] = await apiResponse.json();

    // [NOVO] Adiciona uma distância falsa e aleatória para cada médico
    const physiciansWithMockDistance = physicians.map((physician) => {
      // Pega o primeiro endereço como referência
      const mainAddress = physician.addresses[0];
      if (mainAddress) {
        // Gera um número aleatório entre 1 e 25 km
        mainAddress.distance = parseFloat((Math.random() * 24 + 1).toFixed(1));
      }
      return physician;
    });

    // [NOVO] Ordena os médicos pela distância falsa (do menor para o maior)
    physiciansWithMockDistance.sort((a, b) => {
      const distanceA = a.addresses[0]?.distance ?? Infinity;
      const distanceB = b.addresses[0]?.distance ?? Infinity;
      return distanceA - distanceB;
    });

    return NextResponse.json(physiciansWithMockDistance);
  } catch (error) {
    console.error("Falha ao fazer fetch dos médicos:", error);
    return NextResponse.json(
      { error: "Serviço de busca de médicos indisponível." },
      { status: 500 }
    );
  }
}
