async function getPlayerData() {
  const nameID = document.getElementById("nameID").value.trim();
  const output = document.getElementById("output");

  if (!nameID) {
    output.innerHTML = "<p>Please enter a name or ID.</p>";
    return;
  }

  const url = `https://corsproxy.io/?https://api.manarion.com/players/${encodeURIComponent(nameID)}`;
  output.innerHTML = "<p>Fetching data...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Build Basic Info table
    const basicInfoTable = `
      <h2>Basic Info</h2>
      <table>
        <tr><th>Name</th><td>${data.Name}</td></tr>
        <tr><th>Level</th><td>${data.Level}</td></tr>
        <tr><th>Zone</th><td>${data.Zone}</td></tr>
        <tr><th>Magic Type</th><td>${data.MagicType}</td></tr>
        <tr><th>Action Type</th><td>${data.ActionType}</td></tr>
        <tr><th>Sigil Boost</th><td>${data.SigilBoost}</td></tr>
      </table>
    `;

    // Build Stats table
    const statsTable = `
      <h2>Stats</h2>
      <table>
        <tr><th>Kills</th><td>${data.Kills}</td></tr>
        <tr><th>Deaths</th><td>${data.Deaths}</td></tr>
        <tr><th>Mining Level</th><td>${data.MiningLevel}</td></tr>
        <tr><th>Fishing Level</th><td>${data.FishingLevel}</td></tr>
        <tr><th>Woodcutting Level</th><td>${data.WoodcuttingLevel}</td></tr>
        <tr><th>Gather Actions</th><td>${data.GatherActions.toLocaleString()}</td></tr>
        <tr><th>Event Actions</th><td>${data.EventActions.toLocaleString()}</td></tr>
        <tr><th>Event Points</th><td>${data.EventPoints.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
      </table>
    `;

    // Build Boosts Summary table - show some key totals (e.g. keys 1,2,3, etc. from TotalBoosts)
    // We'll pick a few important boost keys to display (customize as needed)
    const importantBoostKeys = [1,2,3,4,5,6,7,8,9,10];
    const boostsRows = importantBoostKeys.map(key => {
      const val = data.TotalBoosts[key] !== undefined ? data.TotalBoosts[key] : "N/A";
      return `<tr><th>Boost ${key}</th><td>${val}</td></tr>`;
    }).join("");

    const boostsTable = `
      <h2>Total Boosts (summary)</h2>
      <table>
        ${boostsRows}
      </table>
    `;

    // Combine all tables
    output.innerHTML = basicInfoTable + statsTable + boostsTable;

  } catch (error) {
    output.innerHTML = `<p>Error fetching player data:<br>${error.message}</p>`;
  }
}
