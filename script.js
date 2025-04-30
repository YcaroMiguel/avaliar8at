let groups = [];

function addGroup() {
  const groupName = document.getElementById("groupName").value.trim();
  if (!groupName) return alert("Digite o nome do grupo.");

  const group = {
    name: groupName,
    categories: {
      slideVisual: 0,
      slideInformativo: 0,
      oratoria: 0,
      dinamica: 0
    }
  };

  groups.push(group);
  renderGroups();
  document.getElementById("groupName").value = "";
}

function renderGroups() {
  const container = document.getElementById("groups");
  container.innerHTML = "";

  groups.forEach((group, index) => {
    container.innerHTML += `
      <div class="group">
        <h3>${group.name}</h3>
        <div class="category">
          <label>Slide (visual):</label>
          <input type="number" min="0" max="10" onchange="updateScore(${index}, 'slideVisual', this.value)">
        </div>
        <div class="category">
          <label>Slide (informações):</label>
          <input type="number" min="0" max="10" onchange="updateScore(${index}, 'slideInformativo', this.value)">
        </div>
        <div class="category">
          <label>Oratória/apresentação:</label>
          <input type="number" min="0" max="10" onchange="updateScore(${index}, 'oratoria', this.value)">
        </div>
        <div class="category">
          <label>Dinâmica:</label>
          <input type="number" min="0" max="10" onchange="updateScore(${index}, 'dinamica', this.value)">
        </div>
      </div>
    `;
  });
}

function updateScore(groupIndex, category, value) {
  groups[groupIndex].categories[category] = parseFloat(value) || 0;
}

function showRanking() {
  const container = document.getElementById("ranking");
  container.innerHTML = "<h2>Ranking Final</h2>";

  const scores = groups.map(group => {
    const total = Object.values(group.categories).reduce((a, b) => a + b, 0);
    return { name: group.name, total };
  });

  scores.sort((a, b) => b.total - a.total);

  scores.forEach((g, i) => {
    container.innerHTML += `<p><strong>${i + 1}º</strong> - ${g.name}: ${g.total} pontos</p>`;
  });

  container.classList.remove("hidden");
      }
