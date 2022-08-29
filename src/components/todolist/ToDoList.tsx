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

    const addNewTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeNewTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTaskHandler()
        }
    }
    // let [title, setTitle] = useState('')
    // const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if(e.charCode === 13){
    //        addNewTasks()
    //     }
    // }
    // const addNewTasks = () => {
    //     props.addTask(title)
    //     setTitle('')
    // }

    const allButtonHandler = () => props.changeFilter('All')
    const activeButtonHandler = () => props.changeFilter('Active')
    const complateButtonHandler = () => props.changeFilter('Completed')

    let tasksItem: any = <span className={style.task}>Tasks list is empty</span>
    if (props.tasks.length) {
        tasksItem = props.tasks.map(task => {
            const removeTaskButtonHandler = () => {
                props.removeTask(task.id)
            }
            return (
                <li key={task.id}>
                    <input className={style.input} type="checkbox" checked={task.isDone}/>
                    <span className={style.task}>{task.title}</span>
                    <button className={style.button} onClick={removeTaskButtonHandler}>X
                    </button>
                </li>
            )
        })
    }
    return (
        <div className={style.wrap}>
            <h3 className={style.title}>{props.title}</h3>
            <div className={style.addTask}>
                <input className={style.inputTitle} value={title} onChange={onChangeNewTaskHandler}
                       onKeyPress={onKeyPressNewTaskHandler}/>
                <button className={style.buttonTwo} onClick={addNewTaskHandler}>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div className={style.buttonWrap}>
                <button className={style.button} onClick={allButtonHandler}>All</button>
                <button className={style.button} onClick={activeButtonHandler}>Active</button>
                <button className={style.button} onClick={complateButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}