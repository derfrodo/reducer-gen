import TodoItem from "./Todo/TodoItem";
import { todoActionCreators } from "./Todo/reducer";
import { TodoReducerContextProvider, useNamedTodoStatePropertyValue, useTodoReducerContextDispatch } from "./Todo/reducer/ReducerContext.main.generated";

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
          <AddTodo />
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

  const addTodo = () => {
    dispatch(todoActionCreators.todosAddItem({ done: false, task: "New Task" }));
  };
  return <>
    <form onSubmit={e => {
      e.preventDefault();
      addTodo();
    }}>
      <button type="button" onClick={addTodo}>Add Todo</button>
    </form>
    {/* {todos.map(todo => (<TodoItem key={todo.text} todo={todo} />))} */}
  </>;

}

export default App;
