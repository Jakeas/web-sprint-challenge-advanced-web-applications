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

  
  
  const saveEdit = (e) => {
    e.preventDefault();
    const id = colorToEdit.id
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res =>{
        console.log("Color put RES", res)
        const newColors = colors.filter((color) => color.id !== id )
        newColors.push(colorToEdit)
        updateColors(newColors)
      })
      .catch(err => {
        console.log("put ERR",err)
      })
  }

  /* We map over the data set, looking for the color we are wanting to edit based of the id, if the id of the color we're on is correct, we overwrite that color with the new edits, otherwise, we just return the color as it is.
  and extra hint would be that directly correlates to how you set your filtering process up */
  
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