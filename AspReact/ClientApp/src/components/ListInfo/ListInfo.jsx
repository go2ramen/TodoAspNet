import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTodoById, getListById } from '../../api/apiMethods';
import { Todo } from '../Todo/Todo';
import { TodoForm } from '../TodoForm/TodoForm';
import cls from './ListInfo.module.scss';

export function ListInfo(props) {
    //const { id } = useParams();
    const { data } = props;
    const { deleteTodo } = props;
    const { addTodo } = props;
    const { statusUpdate } = props;
    //console.log(data);

    return (
        <div className={cls.list__listwrapper}>
            <TodoForm listId={data.listId} addTodo={addTodo}/>
            <div className={cls.list__title}>{data.name}</div>
            <div className={cls.list__desc}>{data.desc}</div>

            
            {
                data.todoItems.filter((item) => item.completed === false).length > 0 ?
                <div className={cls.list__truewrapper}>
                        {
                            data.todoItems.map(function (item, index) {
                                if (item.completed === false) {
                                    return (
                                        <Todo key={index}
                                            todo={item}
                                            deleteTodo={deleteTodo}
                                            statusUpdate={statusUpdate}

                                        />
                                    );
                                }
                            })
                        }
                </div>
                    :
                <span></span>
            }


            {
                data.todoItems.filter((item) => item.completed === true).length > 0 ?
                    <div className={cls.list__falsewrapper}>
                        {
                            data.todoItems.map(function (item, index) {
                                if (item.completed === true) {
                                    return (
                                        <Todo key={index}
                                            todo={item}
                                            deleteTodo={deleteTodo}
                                            statusUpdate={statusUpdate}
                                        />
                                    );
                                }
                            })
                        }
                    </div>
                    :
                    <span></span>
            }
            
        </div>
        
        );
}