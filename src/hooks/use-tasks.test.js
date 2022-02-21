import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTasks } from './use-tasks';
import * as api from '../services/api';

jest.mock('../services/api');

// Task: id; name; responsible; isCompleted;

describe('first', () => {
    let TestComponent;
    beforeEach(() => {
        api.getAll.mockResolvedValue({
            data: [{ id: 1, name: 'Pepe' }],
        });
        api.set.mockResolvedValue({
            data: { id: 2, name: 'Juan' },
        });
        api.update.mockResolvedValue({
            data: { id: 2, name: 'Juan', isCompleted: true },
        });
        // eslint-disable-next-line func-names
        TestComponent = function () {
            const { title, tasks, addTask } = useTasks();
            console.log(tasks);
            return (
                <div>
                    <h1>Testing</h1>
                    <p>{title}</p>
                    <ul>
                        {tasks.map((item) => (
                            <li key={item.id}> {item.name}</li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => {
                            addTask({ name: 'Juan' });
                        }}
                    >
                        Add Task
                    </button>
                </div>
            );
        };
    });

    test('should first', async () => {
        render(<TestComponent />);
        expect(screen.getByText(/TODO/i)).toBeInTheDocument();
        expect(await screen.findByText(/Pepe/i)).toBeInTheDocument();
        const btn = screen.getByText(/Add/i);
        expect(btn).toBeInTheDocument();
        userEvent.click(btn);
        expect(api.set).toHaveBeenCalledWith({ name: 'Juan' });
        expect(await screen.findByText(/Juan/i)).toBeInTheDocument();
    });
});
