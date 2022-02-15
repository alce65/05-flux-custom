import { createContext, useReducer, useEffect } from 'react';
import { TasksReducer } from '../reducers/reducers';
import * as api from '../services/api';
import * as actions from '../reducers/action-creators';

// Instanciar el objeto Context usando el factory createContex
// Definimos el "interface" del subtipo
// exportamos la variable

export const Context = createContext({
    title: '',
    tasks: [],
    addTask: () => {},
    deleteTask: () => {},
    updateTask: () => {},
});

// Creamos un componente Provider
// recive por props children
// utiliza la propiedad "Provider" del objeto Context

// Al Contex.Provaider le asignamos el valor del contexto
// o una variable con dicho valor

export function ContextProvider({ children }) {
    // const [tasks, setTasks] = useState([]);

    const [tasks, dispatch] = useReducer(TasksReducer, []);

    useEffect(() => {
        api.getAll().then(
            (resp) =>
                dispatch(
                    // { type: '@tasks/load', tasks: resp.data }
                    actions.loadTasks(resp.data)
                )
            // setTasks(resp.data);
        );
    }, []);

    const addTask = (newTask) => {
        // const newTasks = [...tasks, newTask];
        // store.setTasks(newTasks).then(() => setTasks(newTasks));
        api.set(newTask).then((resp) => {
            dispatch(actions.addTask(resp.data));
            // ((setTasks([...tasks, resp.data]);
        });
    };

    const deleteTask = (task) => {
        // const newTasks = tasks.filter((item) => item.id !== task.id);
        // store.setTasks(newTasks).then(() => setTasks(newTasks));
        api.remove(task.id).then((resp) => {
            if (resp.status === 200) {
                dispatch(actions.removeTask(task));
                // setTasks(tasks.filter((item) => item.id !== task.id));
            }
        });
    };

    const updateTask = (task) => {
        /* const newTasks = tasks.map((item) =>
            item.id === task.id
                ? { ...item, isCompleted: !item.isCompleted }
                : item
        );
        store.setTasks(newTasks).then(() => setTasks(newTasks)); */
        api.update(task).then((resp) => {
            dispatch(actions.toggleTask(resp.data));
            /* setTasks(
                tasks.map((item) =>
                    item.id === resp.data.id
                        ? { ...item, isCompleted: !item.isCompleted }
                        : item
                )
            ); */
        });
    };

    const title = 'TODO List with Flux & Context';

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        title,
        tasks,
        addTask,
        deleteTask,
        updateTask,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
