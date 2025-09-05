async function loadCatalog() {
  const res = await fetch("/api/items");
  const items = await res.json();

  const container = document.getElementById("catalog-container");
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${item.name}</h2>
      <p><strong>Categoría:</strong> ${item.category}</p>
      <p><strong>Precio:</strong> $${item.price}</p>
      <p><strong>Stock:</strong> ${item.stock}</p>
      <button onclick="viewDetail(${item.id})">Ver más</button>
    `;

    container.appendChild(card);
  });
}

async function viewDetail(id) {
  const res = await fetch(`/api/items/${id}`);
  const item = await res.json();

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p><strong>Precio:</strong> $${item.price}</p>
      <p><strong>Categoría:</strong> ${item.category}</p>
      <p><strong>Fecha:</strong> ${item.date}</p>
      <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

loadCatalog();