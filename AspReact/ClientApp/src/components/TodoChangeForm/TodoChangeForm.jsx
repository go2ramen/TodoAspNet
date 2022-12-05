import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from '../../api/apiMethods';
import { convertDateString } from '../../util/helper';
import cls  from './TodoChangeForm.module.scss';

export function TodoChangeForm(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [todoState, setTodo] = useState({});
    const [titleState, setTitle] = useState("");
    const [descState, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);
    const [dateState, setDate] = useState("2017-06-01");

    const getTodoFromDb = async () => {
        const data = await getTodoById(id);
        setTodo(data);
        
        setTitle(data.title);
        setDesc(data.desc);
        setDate(convertDateString(data.dueDate));
        console.log(data);
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        //console.log(titleState + " " + descState + " " + completed + " " + dateState);
        const todo = {
            'TodoId': todoState.todoId,
            'Title': titleState,
            'Desc': descState,
            'Completed': todoState.completed,
            'DueDate': dateState,
            'Created': todoState.created,
            'TodoListId': todoState.todoListId,
            
        }
        const response = await updateTodo(todo);
        if (response.status === 200) {
            navigate("/");
        }
        console.log(response)
    }

    const onChangeHandlerName = (e) => {
        setTitle(e.target.value);
    }

    const onChangeHandlerDesc = (e) => {
        setDesc(e.target.value);
    }

    const onChangeDateHandler = (e) => {
        setDate(e.target.value);
    }

    useEffect(() => {
        getTodoFromDb();
    }, []);
    console.log(convertDateString(dateState));

    return (
        <div className={cls.form__wrapper}>
            <form method="post" onSubmit={submitHandler}
                className={cls.form}
            >
                <input type="text" name="Title" value={titleState}
                    className={cls.form__inputText}
                    onChange={onChangeHandlerName}
                    
                />
                <input type="text" name="Desc" value={descState}
                    className={cls.form__inputText}
                    onChange={onChangeHandlerDesc}
                />
                <div className={cls.form__optionwrapper}>
                    <input type="date"
                        value={dateState}
                        onChange={(e) => {
                            setDate(e.target.value);

                        }}

                    />
                </div>

                <button type="submit">
                    Обновить
                </button>
            </form>
        </div>
        );
}


