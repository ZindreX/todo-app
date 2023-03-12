import { TodoType } from "../componets/Todo/TodoType";

export const todoComparer = (todo: TodoType, other: TodoType) => {
    if (todo.completed && !other.completed) return -1;
    else if (!todo.completed && other.completed) return 1;
    return 0;
};