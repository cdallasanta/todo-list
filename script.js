let todoList = {
  todos: [],

  //add an item to the list with completed as false
  addTodo: function() {
    //debugger;
    this.todos.push({
      todoText: document.getElementById("todo-input").value,
      completed: false
    });
    document.getElementById("todo-input").value = "";
    view.displayTodos();
  },

  //change an item, positon is 0 indexed
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    view.displayTodos();
  },

  //delete a single item, 0 indexed
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },

  //toggles the completed value of an item
  toggleCompleted: function(position) {
    this.todos[position].completed = !(this.todos[position].completed);
    view.displayTodos();
  },

  //toggle all
  toggleAll: function() {
    var numCompleted = 0;

    //count number of completed items
    this.todos.forEach(function(todo){
      numCompleted += todo.completed;
    });

    //if the number of completed items == total items (meaning: all are complete)
    //toggle all to false
    if (numCompleted === this.todos.length) {
      this.todos.forEach(function(todo){
        todo.completed = false;
      });
    } //otherwise, toggle all items to true
    else {
      this.todos.forEach(function(todo){
        todo.completed = true;
      });
    }
    view.displayTodos();
  },

  deleteAll: function() {
    this.todos.splice(0, this.todos.length);
    view.displayTodos();
  },
  
  removeCompleted: function(){
    for (var i=0;i<this.todos.length;i++){
      if(this.todos[i].completed){
        this.todos.splice(i,1);
        i--; //goes through this item again, since it has changed because of the deletion
      }
    }
    view.displayTodos();
  }
};


let handlers = {
  todoInput:function(){
    if (event.keyCode === 13) {
      todoList.addTodo();
    }
  },
  toggleLI: function(itemIndex){
    todoList.toggleCompleted(itemIndex);
  },
  deleteAll: function(){
    todoList.deleteAll();
  },
  toggleAll: function(){
    todoList.toggleAll();
  },
  removeCompleted: function(){
    todoList.removeCompleted();
  }
}

let view = {
    //display all the items in the list
  displayTodos: function() {
    debugger;
    //clear outputList first
    var list = document.getElementById('outputList');
    list.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      //create new li and span elements
      let node = document.createElement('li');
      let span = document.createElement('span');
      
      //add text to span, set id to item #, add class, and append it all to node
      span.textContent = todo.todoText;
      span.className = "incomplete";
      node.id = position;
      node.appendChild(span);
      node.appendChild(view.createButton());
      
      //append node to the list
      list.appendChild(node);
      
      //if item is completed, change class to completed so CSS can strike it through
      if (todo.completed) {
        document.getElementById(position).firstChild.className = "complete";
      }
    });
  },
  createButton: function(){
    //create a delete button, which gets called in the displayTodos method
    let newButton = document.createElement('button');
    newButton.textContent = "Delete";
    newButton.className = "deleteButton";
    return newButton;
  },
  setUpEventListeners: function(){
    //sets up listener for the ol checking if someone clicked on a delete button to delete or elsewhere in the LI to toggle
    let olSelector = document.getElementById('outputList');
    olSelector.addEventListener('click', function(event){
      if(event.target.className == 'deleteButton'){
        todoList.deleteTodo(event.target.parentNode.id);
      } else if (event.target.tagName == 'SPAN'){
        handlers.toggleLI(event.target.parentNode.id);
      } else if (event.target.tagName == 'LI'){
        handlers.toggleLI(event.target.id);
      }
    });
  }
}

view.setUpEventListeners();

