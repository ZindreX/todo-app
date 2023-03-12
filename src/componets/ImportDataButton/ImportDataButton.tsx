import jsonData from '../../assets/file.json';
import { TodoType } from '../Todo/TodoType';

interface IImportDataButton {
    fetchTodos: (data: TodoType[]) => void;
}

export default function ImportDataButton({fetchTodos}: IImportDataButton) {

    const importDataFromLocalJson = () => {
       console.log(jsonData);
       const importedTodos = jsonData.todos;
       fetchTodos(importedTodos);
    };

    return <button onClick={importDataFromLocalJson}>Import</button>
}
