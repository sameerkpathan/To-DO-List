import { useState } from "react";
import todo from "../images/logo.e29cb290.png";
import "./Todo.css";

const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  //   Add Items

  const addItems = () => {
    if (inputData === "") {
      alert("please Write Something");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  //    Delete Items

  const deleteItem = (id) => {
    console.log(id);

    const updatedItem = items.filter((element, index) => {
      return index !== id;
    });
    setItems(updatedItem);
  };

  // Remove all

  const removeAllItem = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="Error" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              value={inputData}
              onChange={(Event) => {
                setInputData(Event.target.value);
              }}
              placeholder=" ✍ Add Items..."
            />

            <i
              className="fa fa-plus add-btn"
              title="Add Items"
              aria-hidden="true"
              onClick={addItems}
            ></i>
          </div>

          <div className="showItems">
            {items.map((element, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{element}</h3>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Items"
                    onClick={() => deleteItem(index)}
                  ></i>

                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItem}
            >
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
