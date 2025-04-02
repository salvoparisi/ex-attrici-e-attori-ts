type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"
}

function isActress(dato: unknown): dato is Actress {
  if (
    dato &&
    typeof dato === "object" &&
    "most_famous_movies" in dato &&
    Array.isArray(dato.most_famous_movies) &&
    "awards" in dato &&
    typeof dato.awards === "string" &&
    "nationality" in dato &&
    typeof dato.nationality === "string"
  ) {
    return true
  } else {
    return false
  }
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
    const dato: unknown = await res.json()
    if (isActress(dato)) {
      return dato
    } else {
      throw new Error('Formato non valido')
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

async function getAllActress(): Promise<Actress[] | null> {
  try {
    const res = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/actresses')
    const dati: unknown = await res.json()
    if (dati && Array.isArray(dati)) {
      if (dati.every(dato => isActress(dato))) {
        return dati
      } else {
        throw new Error('Formato non valido')
      }
    } else {
      throw new Error('Formato non valido')
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

async function getActresses(id: number[]): Promise<(Actress | null)[]> {
  const arrayPromise = [];
  for (let i = 0; i < id.length; i++) {
    arrayPromise.push(getActress(id[i]));
  }
  try {
    const result = await Promise.all(arrayPromise);
    if (Array.isArray(result)) {
      return result;
    } else {
      throw new Error('Formato non valido')
    }
  } catch (error) {
    console.error("Errore durante il recupero delle attrici:", error);
    return [];
  }
}




