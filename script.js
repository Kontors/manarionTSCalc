async function getPlayerData() {
  const nameID = document.getElementById("nameID").value;
  const output = document.getElementById("output");

  if (!nameID) {
    output.innerText = "Please enter a name or ID.";
    return;
  }

  const url = `https://corsproxy.io/?https://api.manarion.com/players/${encodeURIComponent(nameID)}`;
  output.innerText = "Fetching data...";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    output.innerText = JSON.stringify(data, null, 2); // Pretty print JSON

  } catch (error) {
    output.innerText = `Error fetching player data:\n${error.message}`;
  }
}
