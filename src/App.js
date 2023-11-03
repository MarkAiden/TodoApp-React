import { useEffect, useState } from "react";
import { Title } from "./components/Title";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Play Street Fighter V with friends',
      completed: false,
    },
    {
      id: 2,
      title: "Attend Edwin's party",
      completed: false,
    },
    {
      id: 3,
      title: 'Buy dinner',
      completed: false,
    },
    {
      id: 4,
      title: 'Study 2 hours',
      completed: false,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState(todos)

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;
  
    const newTodo = {
      id: lastId + 1,
      title,
      completed: false
    }
  
    const todoList = [...todos];
    todoList.push(newTodo);
    setTodos(todoList);
  }
  
  const handleSetComplete = (id) => {
    const updatedList = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed}
      }
      return todo
    })

    setTodos(updatedList);
  }

  const handleDelete = (id) => {
    const updatedList = todos.filter(todo => todo.id !== id)
    setTodos(updatedList);
  }

  const handleClearComplete = () => {
    const updatedList = todos.filter(todo => !todo.completed);
    setTodos(updatedList);
  }  

  const showAllTodos = () => {
    setActiveFilter('all');
  }
  
  const showActiveTodos = () => {
    setActiveFilter('active');
  }
  
  const showCompletedTodos = () => {
    setActiveFilter('completed');
  }  

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTodos(todos)
    } else if (activeFilter === 'active') {
      const activeTodos = todos.filter(todo => todo.completed === false)
      setFilteredTodos(activeTodos)
    } else if (activeFilter === 'completed') {
      const completedTodos = todos.filter(todo => todo.completed === true)
      setFilteredTodos(completedTodos)
    }
    
  }, [activeFilter, todos])

  return (
    <div className="bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5">
      <div className="container flex flex-col max-w-xl">
        <Title />
        <TodoInput addTodo={addTodo} />
        <TodoList 
          todos={filteredTodos}
          activeFilter={activeFilter}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleClearComplete={handleClearComplete}
        />
      </div>
      <div class="absolute bottom-0 inset-x-0 flex items-center justify-center text-sm text-gray-400 p-4">
            <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Freivel Hirujo, 2023. </p>
            <div class="order-1 md:order-2">
            <a href="https://www.linkedin.com/in/freivelhirujo/" className="inline-block">
              <span className="px-2 hover:underline">Linkedin</span>
            </a>
            </div>
      </div>
    </div>
  );
}

export default App;
