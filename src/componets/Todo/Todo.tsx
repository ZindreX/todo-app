import { useState } from "react";
import './Todo.css';

interface ITodo {
    index: number;
    todo: string;
    completed: boolean;
}

export default function Todo({
    index,
    todo,
    completed
}: ITodo) {
    const [isCompleted, setIsCompleted] = useState<boolean>(completed);

    const markCompleted = () => setIsCompleted(!isCompleted);

    return (
        <div className="wrapper">
            <span>{index}</span>
            <span>{todo}</span>
            <input
                type="checkbox"
                name="completed"
                id="completed"
                defaultChecked={isCompleted}
                onClick={markCompleted}
            />
        </div>
    )
}
