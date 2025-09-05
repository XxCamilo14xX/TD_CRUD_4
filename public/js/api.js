export async function getItems() {
  const res = await fetch("/api/items");
  return res.json();
}

export async function createItem(item) {
  await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function updateItem(id, item) {
  await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function deleteItem(id) {
  await fetch(`/api/items/${id}`, {
    method: "DELETE"
  });
}