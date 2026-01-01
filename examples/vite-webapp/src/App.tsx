import TodoItem from "./Todo/TodoItem";
import { todoActionCreators } from "./Todo/reducer";
import { TodoReducerContextProvider, useDirectTodoProperty, useNamedTodoStatePropertyValue, useTodoReducerContextDispatch } from "./Todo/reducer/ReducerContext.main.generated";

function App() {
  return (
    <TodoReducerContextProvider>
      <div className="App" data-testid="app-container">
        <header>
          <h1>The first todo list!</h1>
          <p>Nobody had this brilliant app idea ever before! Source: Trust me, bro!</p>
        </header>
        <main>
          <AddTodo />
          <TodoList />
        </main>
      </div>
    </TodoReducerContextProvider>
  );
}

function TodoList() {
  const todos = useNamedTodoStatePropertyValue("todos");
  return <ul>
    {todos.map(todo => (<TodoItem key={todo.task} todo={todo} />))}
  </ul>;
}

function AddTodo() {
  const dispatch = useTodoReducerContextDispatch();
  const [nextId, setNextId] = useDirectTodoProperty("nextId");
  const addTodo = (task: string) => {
    dispatch(todoActionCreators.todosAddItem({ done: false, task, id: nextId }));
    setNextId(nextId + 1);
  };
  return <>
    <form onSubmit={e => {
      e.preventDefault();
      if (!e.target || !(e.target instanceof HTMLFormElement)) return;
      const formData = new FormData(e.target);
      const task = formData.get("task");

      if (typeof task !== "string") return;
      addTodo(task);

      e.target.reset();
    }}>
      <input autoComplete="off" type="text" placeholder="New todo task" name="task" required />
      <button type="submit">Add Todo</button>
    </form>
  </>;
}

export default App;
