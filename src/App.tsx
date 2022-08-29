import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, ToDoList} from './components/todolist/ToDoList';
import {v1} from 'uuid';

export type filterValueType = 'All' | 'Active' | 'Completed'


function App() {
// Хук useState перерисовывает контент
    const [tasks, setTasks] = useState<Array<TaskPropsType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS&TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ]
    )
    // useState перерисавка контенита
    const [filter, setFilter] = useState<filterValueType>('All')
    // Удаляем таску
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        /*console.log(tasks)// работает асинхронно*/
    }
// Добавляем новую таску
    const addTask = (title: string) => {
        const newTask: TaskPropsType = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    // const addTask = (title: string) => {
    //     let newTask = {id: v1(), title: title, isDone: true}
    //     let newTasks = [newTask, ...tasks]
    //     setTasks(newTasks)
    // }

    //Фильтрация таски
    const changeFilter = (filter: filterValueType) => {
        setFilter(filter)
    }
    const getTaskFoTodolist = () => {
        let taskFoTodolist = tasks
        if (filter === 'Active') {
            taskFoTodolist = tasks.filter(t => !t.isDone)
        }
        if (filter === 'Completed') {
            taskFoTodolist = tasks.filter(t => t.isDone)
        }
        return taskFoTodolist
    }

    return (
        <div className="App">
            <ToDoList removeTask={removeTask}
                      tasks={getTaskFoTodolist()} title="What to learn"
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            {/*<ToDoList tasks={tasksOne} title='My play list'/>*/}
            {/*<ToDoList tasks={tasksOne} title='What learn next'/>*/}
        </div>
    );
}

export default App;
