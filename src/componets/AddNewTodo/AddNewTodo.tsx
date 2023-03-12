import './AddNewTodo.css';

interface IAddNewTodo {
    handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
    newTodo: string;
    addTodo: (newValue: string) => void;
}

export default function AddNewTodo({
    handleInputChange,
    newTodo,
    addTodo
}: IAddNewTodo) {
    return (
        <>
            <input 
                id="addTodo"
                type="text"
                name="newTodo"
                className="input-field"
                placeholder="Add a new todo..."
                onChange={handleInputChange}
                value={newTodo}
                aria-label="Textfield for inserting todo."
            />

            <button
                className="primary-button"
                onClick={() => addTodo(newTodo)}
                aria-label="Button to submit new todo."
            >
                Add
            </button>
        </>
    );
}
