"use client"
import { useState } from "react";
import styles from "../../styles/TaskManager.module.css";

const TaskManager = () => {
    const [inputItem, setInputItem] = useState("");
    const [addedItem, setAddedItem] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const newItem = (event) => {
        setInputItem(event.target.value);
    };

    const addItem = () => {
        if (editIndex !== null) {
            setAddedItem((oldItem) => {
                const updatedItem = [...oldItem];
                updatedItem[editIndex] = inputItem;
                return updatedItem;
            });
            setEditIndex(null);
        } else {
            setAddedItem((oldItem) => {
                return [...oldItem, inputItem];
            });
        }

        setInputItem("");
    };

    const editItem = (index) => {
        setInputItem(addedItem[index]);
        setEditIndex(index);
    };

    const delItem = (index) => {
        setAddedItem((oldItem) => {
            return oldItem.filter((_, i) => i !== index);
        });
        setEditIndex(null);
    };

    const taskCompleted = (index) => {
        const task = document.getElementById(index);
        task.style.color = '#4caf50';
        task.style.fontWeight = 'bold';
        const doneBtn = document.getElementById('doneBtn' + index);
        doneBtn.style.display = 'none';
        const editBtn = document.getElementById('editBtn' + index);
        editBtn.style.display = 'none';
    };

    return (
        <>
            <div className={styles.mainDiv}>
                <div className={styles.heading}>
                    <h1>Task Manager</h1>
                </div>
                <div className={styles.addItem}>
                    <input
                        required
                        type="text"
                        placeholder="Add/Edit Task"
                        onChange={newItem}
                        value={inputItem}
                        className={styles.input}
                    />
                    <button className={styles.button} onClick={addItem}>
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </div>
                <div className={styles.item}>
                    <ul>
                        {addedItem.map((itemValue, index) => (
                            <li className={styles.listGroupItem} key={index} id={index}>
                                <span className={styles.task}>{itemValue}</span>
                                <div>
                                    <button className={styles.doneBtn} onClick={() => taskCompleted(index)} id={'doneBtn' + index}>Done</button>
                                    <button className={styles.editBtn} onClick={() => editItem(index)} id={'editBtn' + index}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => delItem(index)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TaskManager;
