const url = "obras.json";

export async function getDados() {
    try {
        const resposta = await fetch(url);

        if (!resposta.ok) throw new Error("Erro ao acessar JSON");

        return await resposta.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
