// Boost mappings
const boostMap = {
  1: "Base Spellpower",
  2: "Base Ward",
  3: "Intellect",
  4: "Stamina",
  5: "Focus",
  6: "Spirit",
  7: "Mana",
  8: "Spellpower Value",
  9: "Ward Value",
  10: "Fire Mastery",
  11: "Water Mastery",
  12: "Nature Mastery",
  21: "Fire Spell Rank",
  22: "Water Spell Rank",
  23: "Nature Spell Rank",
  24: "Mana Shield Rank",
  30: "Mining",
  31: "Fishing",
  32: "Woodcutting",
  40: "Damage",
  41: "Multicast",
  42: "Crit Chance",
  43: "Crit Damage",
  44: "Haste",
  45: "Health",
  46: "Ward",
  47: "Focus",
  48: "Mana",
  49: "Overload",
  50: "Time Dilation",
  80: "Inferno Value",
  81: "Tidal Wrath Value",
  82: "Wildheart Value",
  83: "Fire Resistance Value",
  84: "Water Resistance Value",
  85: "Nature Resistance Value",
  86: "Vitality Value",
  100: "Base Experience",
  101: "Base Mana Dust",
  102: "Drop Boost",
  103: "Multistat",
  105: "Actions",
  106: "Base Resource",
  107: "Quest Boost",
  108: "Potion Boost",
  109: "Ascension",
  120: "Battle Experience Boost",
  121: "Mana Dust Boost",
  122: "Elemental Shard Boost",
  123: "Stat Drop",
  124: "Base Resource Amount",
  130: "Farm Harvest Golem",
  131: "Farm Fertilizer",
  132: "Farm Plots",
  133: "Potion Belt"
};

const enchant_upgrades = {
  60: "Enchant Inferno Rank",
  61: "Enchant Tidal Wrath Rank",
  62: "Enchant Wildheart Rank",
  63: "Enchant Fire Resistance Rank",
  64: "Enchant Water Resistance Rank",
  65: "Enchant Nature Resistance Rank",
  66: "Enchant Insight Rank",
  67: "Enchant Bountiful Harvest Rank",
  68: "Enchant Prosperity Rank",
  69: "Enchant Fortune Rank",
  70: "Enchant Growth Rank",
  71: "Enchant Vitality Rank",
};

// Combine both maps for easy lookup
const allBoosts = { ...boostMap, ...enchant_upgrades };

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

    // Basic Info Table
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

    // Stats Table
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

    // Boost Keys sorted
    const boostKeysToShow = Object.keys(allBoosts).map(Number).sort((a, b) => a - b);

    // Build Boosts Table with friendly names
    const boostsRows = boostKeysToShow.map(key => {
      const val = data.TotalBoosts && data.TotalBoosts[key] !== undefined ? data.TotalBoosts[key] : "N/A";
      const name = allBoosts[key] || `Boost ${key}`;
      return `<tr><th>${name}</th><td>${val}</td></tr>`;
    }).join("");

    const boostsTable = `
      <h2>Total Boosts (Detailed)</h2>
      <table>
        ${boostsRows}
      </table>
    `;

    // Combine and display all tables
    output.innerHTML = basicInfoTable + statsTable + boostsTable;

  } catch (error) {
    output.innerHTML = `<p>Error fetching player data:<br>${error.message}</p>`;
  }
}


// Tab switcher
function openTab(tabId, btn) {
  // Hide all tabs and remove active class from buttons
  document.querySelectorAll('.tabcontent').forEach(div => div.classList.remove('active'));
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));

  // Show clicked tab and mark button active
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// Player data fetch function
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

    // Assuming boostMap exists (add if you want to show names)
    const importantBoostKeys = [1,2,3,4,5,6,7,8,9,10];
    const boostsRows = importantBoostKeys.map(key => {
      const val = data.TotalBoosts && data.TotalBoosts[key] !== undefined ? data.TotalBoosts[key] : "N/A";
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
    output.innerHTML = `<p style="color:red;">Error fetching player data:<br>${error.message}</p>`;
  }
}

// Market item map
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
  // Replace this with your actual GitHub raw JSON URL:
  const githubRawUrl = 'https://raw.githubusercontent.com/yourusername/yourrepo/main/market.json';

  const outputDiv = document.getElementById('marketOutput');
  outputDiv.innerHTML = "<p>Loading market data...</p>";

  try {
    const response = await fetch(githubRawUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    const json = await response.json();

    const buyData = json.Buy || {};
    const sellData = json.Sell || {};

    let html = `<table>
      <thead>
        <tr><th>ID</th><th>Item Name</th><th>Buy Price</th><th>Sell Price</th><th>Average Price</th></tr>
      </thead>
      <tbody>`;

    const rows = Object.entries(itemMap).map(([idStr, name]) => {
      const id = Number(idStr);
      const buy = buyData[id] ?? "N/A";
      const sell = sellData[id] ?? "N/A";
      const avg = (buy !== "N/A" && sell !== "N/A") ? Math.round((buy + sell) / 2) : (buy !== "N/A" ? buy : (sell !== "N/A" ? sell : "N/A"));

      return `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${buy}</td>
        <td>${sell}</td>
        <td>${avg}</td>
      </tr>`;
    });

    html += rows.join('') + '</tbody></table>';
    outputDiv.innerHTML = html;

  } catch (error) {
    outputDiv.innerHTML = `<p style="color:red;">Error loading market data: ${error.message}</p>`;
  }
}
