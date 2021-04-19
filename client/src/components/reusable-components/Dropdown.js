import React, { useState } from "react";
import "./Dropdown.scss";

function Dropdown({
    title1,
    items,
    multiSelect = false,
    changeDept,
    getDepartment,
}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Select your department");
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

    function handleOnClick(item) {
        if (getDepartment() !== item.value) {
            if (!multiSelect) {
                changeDept(item.value);
                setTitle(item.value);
                setOpen(false);
            } else if (multiSelect) {
                //Rework for multiSelect
            }
        } else {
            changeDept("");
            setTitle("Select your department");
        }
    }

    React.useEffect(() => {
        items.map((item) => {
            if (item.value === getDepartment() && title !== getDepartment()) {
                setTitle(item.value);
            }
        });
    }, [title]);

    function isItemInSelection(item) {
        if (item.value === getDepartment()) {
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
                    <p>{open ? "Close" : "Open"}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map((item) => (
                        <li className="dd-list-item" key={item.id}>
                            <button
                                type="button"
                                onClick={() => handleOnClick(item)}
                            >
                                <span>{item.value}</span>
                                <span>
                                    {isItemInSelection(item) && "Selected"}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;

// const clickOutsideConfig = {
//     handleClickOutside: () => Dropdown.handleClickOutside,
// };

// export default onClickOutside(Dropdown, clickOutsideConfig);

//Contributed from karlhadwen/react-dropdown-menu --> tutorial --> https://www.youtube.com/watch?v=t8JK5bVoVBw
