import jsonData from '../../assets/file.json';
import { TodoType } from '../Todo/TodoType';

interface IImportDataButton {
    fetchTodos: (data: TodoType[]) => void;
    disabled: boolean;
}

export default function ImportDataButton({
    fetchTodos,
    disabled
}: IImportDataButton) {

    const importDataFromLocalJson = () => {
       const importedTodos = jsonData.todos;
       fetchTodos(importedTodos);
    };

    return <button onClick={importDataFromLocalJson} disabled={disabled}>Import</button>
}
