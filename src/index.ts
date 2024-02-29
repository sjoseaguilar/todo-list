const btn = document.getElementById("btn")! as HTMLButtonElement; 
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

interface Todo {
  text: string;
  completed: boolean;
}

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

//read from local storage
function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

//save to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//add a new item
function submit(e: SubmitEvent) {
  //doesn't add if it's an empty value
  if(input.value == ""){
    window.alert('You cannot add empty items');
  }
  //doesn't add if there are 8 items in the list
  else if(todos.length == 8){
    window.alert('Maximum 8 items are allowed to add in the list.');
  }
  else{
    e.preventDefault();
    const newTodo: Todo = {
      text: input.value,
      completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
  
    saveTodos();
    input.value = "";
  }

}

//create the item and its events listener
function createTodo(todo: Todo) {
  const newTodo = document.createElement("input");
  const newDelete = document.createElement("button");
  const newLi = document.createElement("p");

  newTodo.type = "button";
  newTodo.value = todo.text;
  newTodo.className = "todo-uncheck";

  newDelete.textContent = "X";
  newDelete.className = "delete-button";

  newLi.className = "todos";

  newLi.append(newTodo);
  list.append(newLi);

  if(todo.completed){
    newTodo.className = "todo-check";
  }
  else{
    newTodo.className = "todo-uncheck";
    newLi.append(newDelete);
  }

  newTodo.addEventListener("click", function () {
    todo.completed = !todo.completed;
    if(todo.completed){
      newTodo.className = "todo-check";
      newLi.removeChild(newDelete);
    }
    else{
      newTodo.className = "todo-uncheck";
      newLi.append(newDelete);
    }
    saveTodos();
  });


  newDelete.addEventListener("click", e=> {
    let answer = window.confirm('Are you sure you wanna delete that item?');
      if (answer === true) {
        var index = todos.findIndex(function(singleTodo) {
          return singleTodo.text ===todo.text
        });
        list.removeChild(newLi);
        todos.splice(index,1);
        console.log(index);
        console.log(todos);
        saveTodos(); 
        window.alert('Item deleted');
      }
  });

}

form.addEventListener("submit", submit);

