import React, { useState } from "react";
import EditMenu from './EditMenu'
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  
  
  const saveEdit = (e, id) => {
    e.preventDefault();
    if (colorToEdit){
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res =>{
        const newColors =
          colors.map((color) => {
            if (color.id === id){
              return res.data
            } else{
              return color
            }
          })

          newColors.push(colorToEdit)

          updateColors(newColors)
        console.log("put RES ", res.data)
      })
      .catch(err => {
        console.log("put ERR",err)
      })
    } else {
      axiosWithAuth()
        .post('/api/colors', colorToEdit)
        .then(res => {
          setColorToEdit(res.data)
          setEditing(false)
        })
    }  
  };

  
  
  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log("delete RES", res)
        const remainingColors = colors.filter((color) => color.id !== Number(res.data))
        updateColors(remainingColors)
      })
      .catch(err => {console.log("delete ERR", err)})
  };



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.