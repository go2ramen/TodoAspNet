import React, { createRef, useEffect, useState } from 'react';
import cls from './TodoForm.module.scss';
import { addTodoToDb, getAllLists } from '../../api/apiMethods';
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { PlusOutlined } from '@ant-design/icons'

export function TodoForm(props) {
    const iconStyle = { fontSize: '36px', color: '#08c' };
    const { setData } = props;
    const { listId } = props;
    const { addTodo } = props;
    const navigate = useNavigate();
    const [titleState, setTitle] = useState("");
    const [descState, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);
    const [dateState, setDate] = useState("");
    

    const resetStateForm = () => {
        setTitle("");
        setDesc("");
        //setCompleted(false);
        setDate("");

    }
    const submitHandler = async (e) => {
        e.preventDefault();

        console.log(titleState + " " + descState + " " + completed + " " + listId);
        const todo = {
          'Title': titleState,
          'Desc': descState,
          'Completed': completed,
          'TodoListId': listId,
            'DueDate': dateState,
        }

        const response = await addTodoToDb(todo);
        if (response.status === 200) {
            addTodo(todo);
            resetStateForm();
        }
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

    const onSelectDatePicker = (e) => {

        if (new Date(Date.now()) > new Date(e.target.value)) {
            e.target.value = "";
            return;
        }

        //console.log(new Date(e.target.value))
        
        setDate(e.target.value);
    }
    //<DatePicker onChange={onSelectDate} />
    return (
        <div >
            <form method="post" onSubmit={submitHandler}
                className={cls.form__wrapper}
            >
                <div className={cls.form__inputwrapper}>
                    <div>
                        <label htmlFor="Title" className={cls.form__label}>Title</label>
                        <input type="text" name="Title" value={titleState}
                            onChange={onChangeHandlerName}
                            className={cls.form__input}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="Desc" className={cls.form__label}>Description</label>
                        <input type="text" name="Desc" value={descState}
                            onChange={onChangeHandlerDesc}
                            className={cls.form__input}
                            autoComplete="off"
                        />
                    </div>
                </div>
                
                <div className={cls.form__optionwrapper}>
                    <input type="checkbox" name="Completed"
                        className={cls.form__checkbox}
                        onChange={() => { setCompleted(!completed) }}
                    ></input>
                    <input type="date" onChange={onSelectDatePicker}
                    />
                    <span onClick={submitHandler}>
                        <PlusOutlined style={iconStyle} />
                    </span>
                </div>
                
                
            </form>
        </div>
    );
}