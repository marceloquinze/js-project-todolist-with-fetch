// Main endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetch information from API
function fetchData() {
	fetch(API_URL + '/?_limit=10')
		.then((res) => res.json())
		.then((data) => displayTodos(data));
}

// Display todos
function displayTodos(todos) {
	todos.forEach((item) => addTodoToDOM(item));
}

// Add todos to DOM
function addTodoToDOM(item) {
	const div = document.createElement('div');
	const x = document.createElement('button');
	x.classList.add('close');
	x.appendChild(document.createTextNode('x'));

	div.classList.add('todo-item');

	div.appendChild(x);

	div.appendChild(document.createTextNode(item.title));
	item.completed && div.classList.add('done');
	div.setAttribute('data-id', item.id);
	document.querySelector('#todo-list').appendChild(div);
}

// Post todos: it won't persist!
function addTodos(e) {
	e.preventDefault();

	const newTodo = {
		title: e.target.firstElementChild.value,
		completed: false,
	};

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(newTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => addTodoToDOM(data));
}

// Toggle completed
function toggleCompleted(e) {
	if (e.target.classList.contains('todo-item')) {
		e.target.classList.toggle('done');
	}

	// Call updateTodo function: it won't persist
	updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
}

// Update todos: it won't persist
function updateTodo(id, completed) {
	fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ completed }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

// Remove todo from UI
function removeTodo(e) {
	if (e.target.classList.contains('close')) {
		const id = e.target.dataset.id;
		fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then(() => e.target.parentNode.remove());
	}
}

// Init functions and event listeners
function init() {
	document.addEventListener('DOMContentLoaded', fetchData);
	document.querySelector('#todo-form').addEventListener('submit', addTodos);
	document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
	document.querySelector('#todo-list').addEventListener('click', removeTodo);
}

init();
