"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
//const todos: Todo[];
function submit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    //todos.push(newTodo);
    //saveTodos();
    input.value = "";
}
function createTodo(todo) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        //saveTodos();
    });
    //newLI.append(todo.text);
    //newLI.append(checkbox);
    //list.append(newLI);
}
form.addEventListener("submit", submit);
