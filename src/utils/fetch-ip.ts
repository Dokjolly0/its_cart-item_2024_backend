export async function getIP(): Promise<string | undefined> {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      return data.ip;
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
      return undefined;
    });
}
