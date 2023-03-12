import { useState } from "react";
import './Todo.css';

interface ITodo {
    index: number;
    todo: string;
    completed: boolean;
    handleRemove: (index: number) => void;
    handleCompletedChanged: (index: number) => void;
}

export default function Todo({
    index,
    todo,
    completed,
    handleRemove,
    handleCompletedChanged
}: ITodo) {

    const markCompleted = () => {
        handleCompletedChanged(index);
    };

    return (
        <div className="wrapper">
            <span>{index}</span>
            <span className="todo-text">{todo}</span>
            <input
                type="checkbox"
                name="completed"
                id="completed"
                defaultChecked={completed}
                onClick={markCompleted}
                className="completed-checkbox"
            />
            <button className="delete-button" onClick={() => handleRemove(index)}>X</button>
        </div>
    )
}
