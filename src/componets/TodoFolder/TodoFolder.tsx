import { useState } from "react";
import { todoComparer } from "../../utils/sort";
import AddNewTodo from "../AddNewTodo/AddNewTodo";
import ImportDataButton from "../ImportDataButton/ImportDataButton";
import Todo from "../Todo/Todo";
import { TodoType } from "../Todo/TodoType";
import './TodoFolder.css';

export default function TodoFolder() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [isImportDisabled, setIsImportDisabled] = useState<boolean>(false);

    const cleanUpInputField = () => setNewTodo("");

    const removeTodo = (index: number) => {
        const updatedTodosWithoutIndex = todos.filter(todo => todo.index !== index);
        setTodos(updatedTodosWithoutIndex);
    };

    const isValidInput = (text: string) => text?.length > 0;

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
        const element = todos.find(todo => todo.index === index);
        if (element) {
            element.completed = !element.completed;
        }
    };

    const todoItems = todos.map(todo => {
        return <li key={todo.index} className="todo-list-element">
            <Todo
                index={todo.index}
                todo={todo.todo}
                completed={todo.completed}
                handleRemove={removeTodo}
                handleCompletedChanged={handleCompletedChanged}
            /></li>
    });

    const sortTodosBasedOnConfirmed = () => {
        const sortedTodos = [...todos].sort((a: TodoType, b: TodoType) => todoComparer(a, b))
        setTodos(sortedTodos);
    };

    const cleanupIndexes = (importedTodos: TodoType[]) => {
        let currentLength = todos.length;
        const cleansedImportedTodos: TodoType[] = [];

        importedTodos.forEach(todo => {
            todo.index = currentLength;
            cleansedImportedTodos.push(todo);
            currentLength += 1;
        });
        
        return cleansedImportedTodos;
    };

    const handleFetchTodos = (importedTodos: TodoType[]) => {
        const cleansedImportedTodos = cleanupIndexes(importedTodos);
        const todoListWithImported = todos.concat(cleansedImportedTodos);
        setTodos(todoListWithImported);
        setIsImportDisabled(true);
    };

    return (
        <>
            <h1 aria-label="App title 'Todos'.">Todos</h1>
            <div className="todo-folder-wrapper">
                <AddNewTodo
                    handleInputChange={handleInputChange}
                    newTodo={newTodo}
                    addTodo={addTodo}
                />
            </div>

            <div className="todos">
                <ul>{todoItems}</ul>
            </div>

            <div className="todo-folder-wrapper">
                <button className="secondary-button" onClick={sortTodosBasedOnConfirmed}>Filter</button>
                
                <ImportDataButton fetchTodos={handleFetchTodos} disabled={isImportDisabled} />
            </div>
        </>
    )
}