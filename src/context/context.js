import { createContext } from 'react';
import { useTasks } from '../hooks/use-tasks';

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
    // const [tasks, setTasks] = useState([])
    return <Context.Provider value={useTasks()}>{children}</Context.Provider>;
}
