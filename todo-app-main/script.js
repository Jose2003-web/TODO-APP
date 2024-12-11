document.addEventListener("DOMContentLoaded", () => {
  const themeCheckbox = document.getElementById("theme");
  const body = document.body;
  const addItemInput = document.getElementById("additem");
  const todoList = document.querySelector(".content ul");
  const clearCompleted = document.getElementById("clearCompleted");
  const filters = document.querySelectorAll(".filter input");

  
  themeCheckbox.addEventListener("change", () => {
    body.classList.toggle("theme-light");
    body.classList.toggle("theme-dark");
  });

  
  addItemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && addItemInput.value.trim()) {
      const newItem = createTodoItem(addItemInput.value.trim());
      todoList.appendChild(newItem);
      addItemInput.value = "";
    }
  });

  function createTodoItem(text) {
    const li = document.createElement("li");
    li.classList.add("flex-row");

    const label = document.createElement("label");
    label.classList.add("list-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todoitem";
    checkbox.addEventListener("change", updateCounts);

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    const spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.textContent = text;

    const removeBtn = document.createElement("span");
    removeBtn.classList.add("remove");
    removeBtn.addEventListener("click", () => {
      li.remove();
      updateCounts();
    });

    label.appendChild(checkbox);
    label.appendChild(checkmark);
    label.appendChild(spanText);

    li.appendChild(label);
    li.appendChild(removeBtn);

    return li;
  }

  function updateCounts() {
    const itemsLeft = document.querySelector(".items-left span");
    const totalItems = todoList.querySelectorAll("li").length;
    const completedItems = todoList.querySelectorAll("input[type='checkbox']:checked").length;
    itemsLeft.textContent = `${totalItems - completedItems} items left`;
  }

  filters.forEach((filter) => {
    filter.addEventListener("change", () => {
      const filterId = filter.id;
      const items = todoList.querySelectorAll("li");
      items.forEach((item) => {
        const isChecked = item.querySelector("input[type='checkbox']").checked;
        if (
          (filterId === "active" && isChecked) ||
          (filterId === "Completed" && !isChecked) ||
          (filterId === "clearCompleted" && isChecked)
        ) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
      });
    });
  });

  clearCompleted.addEventListener("click", () => {
    const completedItems = todoList.querySelectorAll("input[type='checkbox']:checked");
    completedItems.forEach((item) => {
      item.closest("li").remove();
    });
    updateCounts();
  });

  updateCounts();
});
