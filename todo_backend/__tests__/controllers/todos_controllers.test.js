// __tests__/todos_controllers.test.js
const { get_todo, add_todo } = require('../../controllers/todos_controllers');
const Todo = require('../../models/todoModels.js');

jest.mock('../../models/todoModels.js');

describe('Todos Controller', () => {
    
    let req, res, jsonMock, statusMock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock }));

        res = {
            status: statusMock
        };

        req = {
            body: {}
        };

        jest.clearAllMocks();
    });

    describe('get_todo', () => {
        it('should return all todos with status 200', async () => {
            const mockTodos = [
                { _id:'1',title: 'Test Todo 1', completed: false },
                { _id:'2',title: 'Test Todo 2', completed: false },
                { _id:'3',title: 'Test Todo 3', completed: false }
            ];

            Todo.find.mockResolvedValue(mockTodos);

            await get_todo(req, res);

            expect(Todo.find).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockTodos);
        });

        it('should return status 500 on error', async () => {
            Todo.find.mockRejectedValue(new Error('DB failure'));

            await get_todo(req, res);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith("Something went wrong");
        });
    });

    describe('add_todo', () => {
        it('should add a new todo and return it with status 200', async () => {
            const newTodoTitle = 'New Test Todo';
            req.body.todo = newTodoTitle;

            const mockSavedTodo = { title: newTodoTitle, completed: false, _id: 'someid' };

            // Mock the Todo constructor and save method
            Todo.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockSavedTodo)
            }));

            await add_todo(req, res);

            expect(Todo).toHaveBeenCalledWith({ title: newTodoTitle });
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(newTodoTitle); // Your controller returns just "todo"

            // If you change the controller to return saved todo:
            // expect(jsonMock).toHaveBeenCalledWith(mockSavedTodo);
        });

        it('should return status 500 on error', async () => {
            req.body.todo = 'faulty';

            Todo.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('DB failure'))
            }));

            await add_todo(req, res);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to add new todo" });
        });
    });
});
