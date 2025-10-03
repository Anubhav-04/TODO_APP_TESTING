

function TodoItem({ item }) {
  return (
    <li>
      {item.title} {<button>Delete</button>}
    </li>
  );
}

export default TodoItem;
