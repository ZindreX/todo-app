import { useState } from "react";
import Todo from "../Todo/Todo";
import { TodoType } from "../Todo/TodoType";
import './TodoFolder.css'

export default function TodoFolder() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const cleanUpInputField = () => setNewTodo("");

    const isValidInput = (text: string) => {
        return text?.length > 0;
    };

    const addTodo = (todo: string) => {
        if (!isValidInput(todo)) return;

        const newTodo: TodoType = {
            index: todos.length,
            task: todo,
            completed: false
        };

        setTodos([...todos, newTodo]);
        cleanUpInputField();
    };

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setNewTodo(inputText);
    };

    const todoItems = todos.map(todo => {
        return <li><Todo index={todo.index} todo={todo.task} completed={todo.completed} /></li>
    });


    return (
        <>
            <h1>Todos</h1>
            <div>
                <input 
                    id="addTodo"
                    type="text"
                    name="newTodo"
                    className="input-field"
                    placeholder="Add a new todo..."
                    onChange={handleInputChange}
                    value={newTodo}
                />
                <button
                    className="add-new-todo-button"
                    onClick={() => addTodo(newTodo)}>
                    Add
                </button>
            </div>

            <div className="todos">
                <ul>{todoItems}</ul>
            </div>

        </>
    )
}