import { useState } from "react";


const Todo = ()=>{

  const[Add,setAdd] = useState("");
  const[Addvalue,setAddvalue]=useState([]);

  const[togglesubmit,setToggleSubmit]=useState(true);

  const[isEditItem,setIsEditItem]=useState(null);


  //Add

  const handleClick = ()=>{
    const allInputData = {
      Id : new Date().getTime().toString(),
      name:Add
    };
    if(Add === ""){
      alert("please Add");
    }else if(Add && !togglesubmit){
      setAddvalue(
        Addvalue.map((elm)=>{
           if(elm.id === isEditItem){
            return{...elm,name:Add}
           }
           return elm
        })
        );
        setAdd("")
        setToggleSubmit(true);
        setIsEditItem(null);


    } else { 
      
      setAddvalue([...Addvalue,allInputData]);
      setAdd("");
    }
  };

  // Delete

   const HandleDelete = (id)=>{
          // console.log(Index)
          const updatedValue = Addvalue.filter((Element,Id)=>{
              return Element.Id !== id;
          });
          setAddvalue(updatedValue);
   }

   //Edit

    const handleEdit = (index)=>{
     console.log(index)
     const newEditItem = Addvalue.find((element)=>{
          return element.Id === index
     })
     console.log(newEditItem)
     setToggleSubmit(false);

     setAdd(newEditItem.name);

     setIsEditItem(index)
    }

  return(
    <div>
      <h1>Welcome</h1>
      <div>
        <input type="text" placeholder="Please Enter ...!" value={Add}  onChange={(Event)=>setAdd(Event.target.value)} />
        {togglesubmit ? <button onClick={handleClick}>Add</button> :<button onClick={handleClick}>Edit</button> }
        {/* <button onClick={handleClick}>Add</button> */}
      </div>
      <div>
       {Addvalue.map((Element)=>{
        return(
          <div key={Element.Id}>
            <p>{Element.name}</p> 
            <button onClick={()=>HandleDelete(Element.Id)}>Delete </button>
            <button onClick={()=>handleEdit(Element.Id)}>Edit</button>
          </div>
        )
       })}
      </div>
    </div>
  );
};


export default Todo;