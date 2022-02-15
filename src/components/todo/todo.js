import './todo.css';
import { useContext } from 'react';
import { Add } from './add';
import { Task } from './task';
import { Context } from '../../context/context';

export function ToDo() {
    const { tasks } = useContext(Context);

    /* const aTasks = tasks.map((task, i) => {
        return <li key={i}>{task}</li>;
    }); */
    return (
        <>
            <Add />
            {tasks.length ? <h2>Lista de tareas</h2> : ''}
            <ul className="task-list">
                {tasks.map((task) => (
                    <Task task={task} key={task.id} />
                ))}
            </ul>
        </>
    );
}
