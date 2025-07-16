// Tab switching function
function openTab(tabId, btn) {
  // Hide all tab content
  const tabs = document.querySelectorAll(".tabcontent");
  tabs.forEach(tab => (tab.style.display = "none"));

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll(".tablinks");
  tabButtons.forEach(b => b.classList.remove("active"));

  // Show selected tab and set active button
  document.getElementById(tabId).style.display = "block";
  btn.classList.add("active");
}

// PLAYER DATA FETCH
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
        <tr><th>Battling Level</th><td>${data.Level}</td></tr>
        <tr><th>Mining Level</th><td>${data.MiningLevel}</td></tr>
        <tr><th>Fishing Level</th><td>${data.FishingLevel}</td></tr>
        <tr><th>Woodcutting Level</th><td>${data.WoodcuttingLevel}</td></tr>
        <tr><th>Action Type</th><td>${data.ActionType}</td></tr>
      </table>
    `;

    // Build Stats table
    const statsTable = `
      <h2>Stats</h2>
      <table>
        <tr><th>Kills</th><td>${data.Kills}</td></tr>
        <tr><th>Deaths</th><td>${data.Deaths}</td></tr>
        <tr><th>Gather Actions</th><td>${data.GatherActions.toLocaleString()}</td></tr>
        <tr><th>Event Actions</th><td>${data.EventActions.toLocaleString()}</td></tr>
        <tr><th>Event Points</th><td>${data.EventPoints.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
      </table>
    `;

    // Build Boosts Summary table
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

    output.innerHTML = basicInfoTable + statsTable + boostsTable;

  } catch (error) {
    output.innerHTML = `<p>Error fetching player data:<br>${error.message}</p>`;
  }
}

// MARKET DATA

const itemMap = {
  2: "Elemental shards",
  3: "Codex",
  4: "Fire essence",
  5: "Water essence",
  6: "Nature essence",
  7: "Fish",
  8: "Wood",
  9: "Iron",
  10: "Asbestos",
  11: "Ironbark",
  12: "Fish scales",
  13: "Tome of fire",
  14: "Tome of water",
  15: "Tome of nature",
  16: "Tome of mana shield",
  17: "Enchant fire resistance",
  18: "Enchant water resistance",
  19: "Enchant nature resistance",
  20: "Enchant inferno",
  21: "Enchant tidal wrath",
  22: "Enchant wildheart",
  23: "Enchant insight",
  24: "Enchant bountiful harvest",
  25: "Enchant prosperity",
  26: "Enchant fortune",
  27: "Enchant growth",
  28: "Enchant vitality",
  29: "Reagent elderwood",
  30: "Reagent lodestone",
  31: "Reagent white pearl",
  32: "Reagent four leaf clover",
  33: "Reagent enchanted droplet",
  34: "Reagent infernal heart",
  35: "Orb of power",
  36: "Orb of chaos",
  37: "Orb of divinity",
  39: "Sunpetal",
  40: "Sageroot",
  41: "Bloomwell",
  44: "Crystallized mana",
  45: "Orb of legacy",
  46: "Elementium",
  47: "Divine essence"
};

async function getMarketData() {
  const marketOutput = document.getElementById("marketOutput");
  marketOutput.innerHTML = "<p>Fetching market data...</p>";

  try {
    const response = await fetch('https://corsproxy.io/?https://api.manarion.com/market');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    const buyData = json.Buy || {};
    const sellData = json.Sell || {};

    // Build table header
    let tableHTML = `
      <h2>Market Prices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const [idStr, name] of Object.entries(itemMap)) {
      const id = parseInt(idStr, 10);
      const buy = buyData[id] ?? "N/A";
      const sell = sellData[id] ?? "N/A";

      let avg;
      if (buy !== "N/A" && sell !== "N/A") {
        avg = Math.round((buy + sell) / 2);
      } else if (buy !== "N/A") {
        avg = buy;
      } else if (sell !== "N/A") {
        avg = sell;
      } else {
        avg = "N/A";
      }

      tableHTML += `
        <tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${buy}</td>
          <td>${sell}</td>
          <td>${avg}</td>
        </tr>
      `;
    }

    tableHTML += "</tbody></table>";
    marketOutput.innerHTML = tableHTML;

  } catch (error) {
    marketOutput.innerHTML = `<p>Error fetching market data:<br>${error.message}</p>`;
  }
}
