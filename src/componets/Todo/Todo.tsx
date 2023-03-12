import { useState } from "react";

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

    const getStateIcon = () => {
        return isCompleted ? 'Completed' : 'X'
    };

    return (
        <div className="">
            <span>{index}</span>
            <span>{todo}</span>
            <span>{getStateIcon()}</span>
        </div>
    )
}
