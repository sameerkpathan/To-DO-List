import { useEffect, useState } from "react";
import todo from "../images/logo.e29cb290.png";
import "./Todo.css";

// Save item on localstorage using getitems

const getLocalItems = () => {
  let list = localStorage.getItem("List");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};

const UpdatedTodo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const [togglesubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //   Add Items

  const addItems = () => {
    const allInputData = {
      id: new Date().getTime().toString(),
      name: inputData,
    };
    if (inputData === "") {
      alert("please Write Something");
      //   setToggleSubmit(true);
    } else if (inputData && !togglesubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleSubmit(true);
    } else {
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  //    Delete Items

  const deleteItem = (id) => {
    console.log(id);

    const updatedItem = items.filter((element) => {
      return element.id !== id;
    });
    setItems(updatedItem);
  };

  //   Edit Item

  // When User click on edit button
  //1= get the id and name of the data which user clicked to edit
  //2= set the toggle mode to change the submit button into edit button
  //3= now update the value of the setinput with the new updated value to edit
  //4= to pass the current element id to new state variable for reference

  const editItem = (id) => {
    const newEditItem = items.find((element) => {
      return element.id === id;
    });
    //   console.log(newEditItem)

    setInputData(newEditItem.name);
    setIsEditItem(id);
    setToggleSubmit(false);
  };

  // Remove all

  const removeAllItem = () => {
    setItems([]);
  };

  //uselocal Storage setItem

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(items));
  }, [items]);

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
            {/* Toggle Submit Button */}
            {togglesubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="fa  fa-edit add-btn"
                title="Update ItemsItems"
                onClick={addItems}
              ></i>
            )}
            ;
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far  fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(element.id)}
                    ></i>

                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Items"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
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

export default UpdatedTodo;
