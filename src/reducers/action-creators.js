import { taskActionTypes } from './action-types';

export const loadTasks = (tasks) => ({
    type: taskActionTypes.load,
    tasks,
});

export const addTask = (task) => ({
    type: taskActionTypes.add,
    task,
});

export const toggleTask = (task) => ({
    type: taskActionTypes.toggle,
    task,
});

export const removeTask = (task) => ({
    type: taskActionTypes.remove,
    task,
});
