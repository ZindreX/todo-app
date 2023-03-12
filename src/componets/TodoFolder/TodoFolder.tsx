import { useState } from "react";
import Todo from "../Todo/Todo";
import { TodoType } from "../Todo/TodoType";
import './TodoFolder.css'

export default function TodoFolder() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const cleanUpInputField = () => setNewTodo("");

    const removeTodo = (index: number) => {
        const updatedTodosWithoutIndex = todos.filter(todo => todo.index !== index);
        setTodos(updatedTodosWithoutIndex);
    };

    const isValidInput = (text: string) => {
        return text?.length > 0;
    };

    const addTodo = (todo: string) => {
        if (!isValidInput(todo)) return;

        const newTodo: TodoType = {
            index: todos.length,
            todo: todo,
            completed: false
        };

        setTodos([...todos, newTodo]);
        cleanUpInputField();
    };

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputText = (e.target as HTMLInputElement).value;
        setNewTodo(inputText);
    };

    const handleCompletedChanged = (index: number) => {
        if (todos[index]) {
            todos[index].completed = !todos[index].completed;
        }
    };

    const todoItems = todos.map(todo => {
        return <li key={todo.index}>
            <Todo
                index={todo.index}
                todo={todo.todo}
                completed={todo.completed}
                handleRemove={removeTodo}
                handleCompletedChanged={handleCompletedChanged}
            /></li>
    });

    const todoComparer = (todo: TodoType, other: TodoType) => {
        if (todo.completed && !other.completed) return -1;
        else if (!todo.completed && other.completed) return 1;
        return 0;
    };

    const sortTodosBasedOnConfirmed = () => {
        const sortedTodos = [...todos].sort((a: TodoType, b: TodoType) => todoComparer(a, b))
        setTodos(sortedTodos);
    };


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
                <button onClick={sortTodosBasedOnConfirmed}>Filter</button>
            </div>

            <div className="todos">
                <ul>{todoItems}</ul>
            </div>

        </>
    )
}