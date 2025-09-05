import { getItems, createItem, updateItem, deleteItem } from "./api.js";
import { renderItems, fillForm } from "./ui.js";

const form = document.getElementById("item-form");
const tableBody = document.getElementById("items-table");

async function refresh() {
  const items = await getItems();
  renderItems(items, tableBody, handleEdit, handleDelete);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("item-id").value;
  const item = {
    name: document.getElementById("item-name").value,
    price: parseFloat(document.getElementById("item-price").value),
    category: document.getElementById("item-category").value,
    stock: parseInt(document.getElementById("item-stock").value),
    date: document.getElementById("item-date").value,
    description: document.getElementById("item-description").value
  };

  if (id) {
    await updateItem(id, item);
  } else {
    await createItem(item);
  }

  form.reset();
  document.getElementById("item-id").value = "";
  refresh();
});

async function handleEdit(id) {
  const items = await getItems();
  const item = items.find(i => i.id === id);
  fillForm(item);
}

async function handleDelete(id) {
  await deleteItem(id);
  refresh();
}

refresh();