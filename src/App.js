import { useState } from "react";

export default function App() {
  const initialTodo = [
    {
      name: "rice",
      id: crypto.randomUUID(),
    },
    {
      name: "rice",
      id: crypto.randomUUID(),
    },
  ];

  const [todoList, setTodoList] = useState(initialTodo);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");

  function handleSubmit() {
    const id = crypto.randomUUID();
    const newTodo = {
      id,
      name,
    };

    // if (edit) {
    //   setTodoList((todos) =>
    //     todos.map((todo) =>
    //       todo.id === idd ? { ...todo, name: newName } : todo
    //     )
    //   );
    // }

    setTodoList((todo) => [...todo, newTodo]);
    setName("");
  }
  function handleDelete(id) {
    setTodoList((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleEdit(id) {
    setEdit(!edit);
    if (edit) {
      setTodoList((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, name: name } : todo))
      );
    }
  }
  return (
    <div className="container">
      <div className="row main">
        <div className="col-lg-4 col-sm-8 text-center main-cont">
          <Message />
          <Header />
          <div className="grocery-item">
            <FormSubmit
              onHandleSubmit={handleSubmit}
              name={name}
              setName={setName}
              edit={edit}
            />
            <div className="grocery-list">
              <TodoList
                onEdit={handleEdit}
                todoList={todoList}
                onDelete={handleDelete}
                name={name}
              />
              <ClearItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Header() {
  return <h3>Grocery Bud</h3>;
}
function Message() {
  return <span className="success">item added sucessfully</span>;
}
function FormSubmit({ onHandleSubmit, name, setName, edit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onHandleSubmit();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="form-input"
        placeholder="e.g eggs"
      />
      <button type="submit" className="submit-btn">
        {edit ? "Edit" : "Submit"}
      </button>
    </form>
  );
}
function TodoList({ todoList, onEdit, onDelete, name }) {
  return (
    <>
      {todoList.map((todo) => (
        <Todo
          todo={todo}
          onEdit={onEdit}
          key={todo.id}
          onDelete={onDelete}
          name={name}
        />
      ))}
    </>
  );
}
function Todo({ todo, onEdit, onDelete, name }) {
  return (
    <div className="items">
      <p>{todo.name}</p>
      <div className="btn-edit-wrapper">
        <button className="edit" onClick={() => onEdit(todo.id)}>
          <i className="bi bi-pencil-square"></i>
        </button>
        <button className="delete" onClick={() => onDelete(todo.id)}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
}
function ClearItem() {
  return (
    <button className="clear-item " id="btn">
      clear items
    </button>
  );
}
