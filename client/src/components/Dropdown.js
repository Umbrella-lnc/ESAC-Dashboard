import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import { isExternalModule } from 'typescript';
import './Dropdown.scss'

function Dropdown({ title1, items, multiSelect = false, changeDept}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [title, setTitle] = useState("Select your department")
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);
  
  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setSelection((selection) => { if (selection.length == 1) { setTitle(selection[0].value); changeDept(selection[0].value); } else {setTitle(title) ; changeDept('')};   return selection;});
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      setTitle("Select your department")
      changeDept('')
    }
  }
  

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);

//Contributed from karlhadwen/react-dropdown-menu --> tutorial --> https://www.youtube.com/watch?v=t8JK5bVoVBw