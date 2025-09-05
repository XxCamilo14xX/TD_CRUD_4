export function renderItems(items, container, onEdit, onDelete) {
  container.innerHTML = "";
  items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.category}</td>
      <td>${item.stock}</td>
      <td>${item.date}</td>
      <td>
        <button onclick="edit(${item.id})">Editar</button>
        <button onclick="remove(${item.id})">Eliminar</button>
      </td>
    `;
    container.appendChild(tr);
  });

  window.edit = onEdit;
  window.remove = onDelete;
}

export function fillForm(item) {
  document.getElementById("item-id").value = item.id;
  document.getElementById("item-name").value = item.name;
  document.getElementById("item-price").value = item.price;
  document.getElementById("item-category").value = item.category;
  document.getElementById("item-stock").value = item.stock;
  document.getElementById("item-date").value = item.date;
  document.getElementById("item-description").value = item.description;
}