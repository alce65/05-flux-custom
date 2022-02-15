import { taskActionTypes } from './action-types';

export function TasksReducer(state, action) {
    switch (action.type) {
        case taskActionTypes.load:
            return [...action.tasks];
        case taskActionTypes.add:
            return [...state, action.task];
        case taskActionTypes.toggle:
            return state.map((item) =>
                item.id === action.task.id
                    ? { ...item, isCompleted: !item.isCompleted }
                    : item
            );
        case taskActionTypes.remove:
            return state.filter((item) => item.id !== action.task.id);
        default:
            return state;
    }
}
