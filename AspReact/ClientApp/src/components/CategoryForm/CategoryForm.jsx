import React, { useEffect, useState }  from 'react';
import cls from './CategoryForm.module.scss';
import { getAllLists } from '../../api/apiMethods';
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons'

export function CategoryForm(props) {
    const { setData } = props;
    const navigate = useNavigate();
    const [nameState, setName] = useState("");
    const [descState, setDesc] = useState("");
    const iconStyle = { fontSize: '36px', color: '#08c' };

    const submitHandler = async(e) => {
        e.preventDefault();
        if ((nameState !== "") && (descState !== "")) {
            console.log(nameState + ' ' + descState);
            await fetch("api/list", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'Name': nameState, 'Desc': descState })
            });
            const response = await getAllLists();

            if (response.status == 200) {
                const data = await response.json();
                //console.log(data);
                setData(data);
                setName("");
                setDesc("");
            }
            
            //setData(data);
        }
    }

    const onChangeHandlerName = (e) => {
        setName(e.target.value);
    }

    const onChangeHandlerDesc = (e) => {
        setDesc(e.target.value);
    }

    return (
        <div className={cls.form__wrapper}>
            <form method="post" onSubmit={submitHandler} className={cls.form}>
                <label htmlFor="Name" className={cls.form__label}>Title</label>
                <input type="text" name="Name" value={nameState}
                    className={cls.form__input}
                    autoComplete="off"
                  onChange={onChangeHandlerName}
                />
                <label htmlFor="Desc" className={cls.form__label}>Desciption</label>
                <input type="text" name="Desc" value={descState}
                    className={cls.form__input}
                    onChange={onChangeHandlerDesc}
                    autoComplete="off"
                />
                <span onClick={submitHandler}>
                    <PlusOutlined style={iconStyle} />
                </span>
                
          </form>
    </div>
  );
}