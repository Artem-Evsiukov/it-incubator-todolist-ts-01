import React from 'react';
import style from './ToDoList.module.css'
import {filterValueType} from '../../App';


export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: filterValueType) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const tasksItem = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>X
                </button>
            </li>
        )
    })
    return (
        <div className={style.wrap}>
            <h3 className={style.title}>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('All')
                }}>All</button>
                <button onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}