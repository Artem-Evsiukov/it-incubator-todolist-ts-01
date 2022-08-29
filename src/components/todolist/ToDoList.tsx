import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from './ToDoList.module.css'
import {filterValueType} from '../../App';


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean

}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: filterValueType) => void
    addTask: (title: string) => void
}

export function ToDoList(props: ToDoListPropsType) {
    let [title, setTitle] = useState('')
    const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
           addNewTasks()
        }
    }
    const addNewTasks = () => {
        props.addTask(title)
        setTitle('')
    }

    const allButtonHandler = () => props.changeFilter('All')
    const activeButtonHandler = () => props.changeFilter('Active')
    const complateButtonHandler = () => props.changeFilter('Completed')

    const tasksItem = props.tasks.map(task => {
        const removeTaskButtonHandler = () => {
            props.removeTask(task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskButtonHandler}>X
                </button>
            </li>
        )
    })
    return (
        <div className={style.wrap}>
            <h3 className={style.title}>{props.title}</h3>
            <div>
                <input value={title} onChange={changeTaskHandler} onKeyPress={onKeyPressTask}/>
                <button onClick={addNewTasks}>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button onClick={allButtonHandler}>All</button>
                <button onClick={activeButtonHandler}>Active</button>
                <button onClick={complateButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}