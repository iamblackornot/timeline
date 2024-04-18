export async function readFileAsString(file: string) {
    const response = await fetch(file)

    if(response.ok) return response.text();

    return '';
}