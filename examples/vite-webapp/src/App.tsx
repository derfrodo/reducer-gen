import TodoItem from "./Todo/TodoItem";
import { TodoReducerContextProvider, useNamedTodoStatePropertyValue } from "./Todo/reducer/ReducerContext.main.generated";

function App() {
  return (
    <TodoReducerContextProvider>
      <div className="App" data-testid="app-container">
        <header>
          <h1>The first todo list!</h1>
          <p>Nobody had this brilliant app idea ever before! Source: Trust me, bro!</p>
        </header>
        <main>
          <TodoList />
        </main>
      </div>
    </TodoReducerContextProvider>
  );
}

function TodoList() {
  const todos = useNamedTodoStatePropertyValue("todos");
  return <ul>
    {todos.map(todo => (<TodoItem key={todo.text} todo={todo} />))}
  </ul>;
}

export default App;
