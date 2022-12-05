import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { changeStatusOfTodo } from '../../api/apiMethods';
import { convertDateString } from '../../util/helper';
import { DeleteOutlined } from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { ClockCircleOutlined } from '@ant-design/icons'
import { CheckCircleOutlined } from '@ant-design/icons'

import cls from './Todo.module.scss';

export function Todo(props) {
    const iconStyle = { fontSize: '36px', color: '#08c' };
    const { todo } = props;
    const { deleteTodo } = props;
    const { statusUpdate } = props;
    const navigate = useNavigate();
    const [statusState, setStatus] = useState(todo.completed);
    const changeStatus = async (id) => {

        statusUpdate(id);

    }

    //console.log(todo);
    return (
        <div className={cls.todo} >    
            
            {
                statusState === true ?
                   
                    <span onClick={() => { changeStatus(todo.todoId) }}
                        className={cls.todo__status}
                    >
                        <CheckCircleOutlined style={iconStyle} />
                    </span>
                     :
                    <span onClick={() => { changeStatus(todo.todoId) }}
                        className={cls.todo__status}
                    >
                        <ClockCircleOutlined style={iconStyle} />
                    </span>

            }
            <div className={cls.todo__wrapper}>
                <div className={cls.todo__title}>{todo.title}</div>
                <div className={cls.todo__desc}>{todo.desc}</div>
            </div>
            <div className={cls.todo__datewrapper}>
                <div>{convertDateString(todo.created)}</div>
                <div>{convertDateString(todo.dueDate)}</div>
            </div>
            
            <div className={cls.todo__btnwrapper}>
                <span onClick={(e) => deleteTodo(todo.todoId)}
                    className={cls.todo__icon}
                >
                    <DeleteOutlined style={iconStyle} />
                </span>
                <span onClick={() => { navigate(`changeTodo/${todo.todoId}`) }}
                        className={cls.todo__icon}>
                        <EditOutlined style={iconStyle} />
                </span>
                
            </div>
            
        </div>
        )
}

//<button onClick={() => {changeStatus(todo.todoId)}}>change status</button>