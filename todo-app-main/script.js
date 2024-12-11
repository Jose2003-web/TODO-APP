// Seleccionar elementos del DOM
const themeToggle = document.getElementById('theme');
const newItemInput = document.getElementById('additem');
const todoList = document.querySelector('.todo-list');
const filterButtons = document.querySelectorAll('.filter button');
const itemsLeft = document.querySelector('.items-left span');

function updateItemsLeft() {
  const activeItems = document.querySelectorAll('.todo-list li:not(.completed)').length;
  itemsLeft.textContent = activeItems;
}

function createNewTodoItem(text) {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  li.innerHTML = `
    <label class="list-item">
      <input type="checkbox" class="toggle">
      <span class="checkmark"></span>
      <span class="text">${text}</span>
    </label>
    <span class="remove">&times;</span>
  `;

  todoList.appendChild(li);
  updateItemsLeft();
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
});

newItemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newItemInput.value.trim()) {
    createNewTodoItem(newItemInput.value.trim());
    newItemInput.value = '';
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle')) {
    // Marcar como completada
    e.target.closest('li').classList.toggle('completed');
    updateItemsLeft();
  } else if (e.target.classList.contains('remove')) {
    // Eliminar tarea
    e.target.closest('li').remove();
    updateItemsLeft();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    const allTodos = todoList.querySelectorAll('li');

    allTodos.forEach((todo) => {
      switch (filter) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'active':
          todo.style.display = todo.classList.contains('completed') ? 'none' : 'flex';
          break;
        case 'completed':
          todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  });
});

updateItemsLeft();