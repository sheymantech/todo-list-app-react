import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [deleteItem, setDelete] = useState(false);
  const [added, setadded] = useState(false);
  const [message, setMessage] = useState(false);
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
    setDelete(false);
    setEdit(false);
    setadded(!added);
  }
  function handleDelete(id) {
    setTodoList((todos) => todos.filter((todo) => todo.id !== id));
    setadded(false);
    setEdit(false);
    setDelete(!deleteItem);
    displayMessage();
  }

  function handleEdit(id) {
    if (edit) {
      setTodoList((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, name: name } : todo))
      );
      setDelete(false);
      setadded(false);
      setEdit(!edit);
    }
    setDelete(false);
    setadded(false);
    setEdit(!edit);
    displayMessage();
  }
  function displayMessage() {
    setMessage(true);
    setTimeout(function () {
      setMessage(false);
    }, 1500);
  }
  function clearAll() {
    setTodoList([]);
    setDelete(true);
    setEdit(false);
    setadded(false);
    displayMessage();
  }
  return (
    <div className="container">
      <div className="row main">
        <div className="col-lg-4 col-sm-8 text-center main-cont">
          {message ? (
            <span className={deleteItem ? "danger" : "success"}>
              item {`${deleteItem ? "deleted" : ""}`}
              {`${edit ? "edited" : ""}`}
              {`${added ? "added" : ""}`} sucessfully
            </span>
          ) : (
            ""
          )}
          <Header />
          <div className="grocery-item">
            <FormSubmit
              onHandleSubmit={handleSubmit}
              name={name}
              setName={setName}
              edit={edit}
              displayMessage={displayMessage}
            />
            <div className="grocery-list">
              <TodoList
                onEdit={handleEdit}
                todoList={todoList}
                onDelete={handleDelete}
                name={name}
              />
              <ClearItem todoList={todoList} onClear={clearAll} />
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

function FormSubmit({ onHandleSubmit, name, setName, edit, displayMessage }) {
  function handleSubmit(e) {
    e.preventDefault();
    onHandleSubmit();
    displayMessage();
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
function ClearItem({ todoList, onClear }) {
  return (
    <button
      className={` ${todoList.length === 0 ? "hidden" : ""}`}
      onClick={onClear}
      id="btn"
    >
      clear items
    </button>
  );
}
