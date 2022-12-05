import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cls from './ListChangeForm.module.scss';
import {  getListById, updateListItem } from '../../api/apiMethods';

export function ListChangeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nameState, setName] = useState("");
    const [descState, setDesc] = useState("");
    const [myList, setMyList] = useState({});

    const fetchListById = async () => {
        const data = await getListById(id);
        setName(data.name);
        setDesc(data.desc);
        setMyList(data);
        console.log(data);
    }

    useEffect(() => {
        fetchListById();
    }, []);

    const submitHandler = async (e) => {
        setMyList({ ...myList, name: nameState, desc: descState });
        e.preventDefault();
        console.log( myList);
        const response = await updateListItem(myList);
        console.log(response);
        navigate("/");
    }


    const onChangeHandlerName = (e) => {
        setName(e.target.value);
        setMyList({ ...myList, name: e.target.value });
    }
    
    const onChangeHandlerDesc = (e) => {
        setDesc(e.target.value);
        setMyList({ ...myList, desc: e.target.value });
    }

    return (
        <div className={cls.form__wrapper}>
            <form method="post" onSubmit={submitHandler} className={cls.form}>
                <label htmlFor="Name" className={cls.form__label}>Title</label>
                <input type="text" name="Name" value={nameState}
                    onChange={onChangeHandlerName}
                    className={cls.form__input}
                    autoComplete="off"
                />
                <label htmlFor="Desc" className={cls.form__label}>Desciption</label>
                <input type="text" name="Desc" value={descState}
                    onChange={onChangeHandlerDesc}
                    className={cls.form__input}
                    autoComplete="off"
                />
                <input type="submit" value="Update" className={cls.form__btn} />
            </form> 
        </div>
    );
}
