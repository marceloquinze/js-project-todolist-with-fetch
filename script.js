const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function fetchData() {
	fetch(API_URL + '/?_limit=5')
		.then((res) => res.json())
		.then((data) => displayTodos(data));
}

function displayTodos(todos) {
	todos.forEach((item) => addTodoToDOM(item));
}

function addTodoToDOM(item) {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(item.title));
	item.completed && div.classList.add('done');
	div.setAttribute('data-id', item.id);
	document.querySelector('#todo-list').appendChild(div);
}

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

function init() {
	document.addEventListener('DOMContentLoaded', fetchData);
	document.querySelector('#todo-form').addEventListener('submit', addTodos);
}

init();
