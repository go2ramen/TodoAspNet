import React, { useEffect, useState }  from 'react';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { useNavigate } from "react-router-dom";
import cls from './Home.module.scss';
import { addTodoToDb, changeStatusOfTodo, deleteTodoById, getAllLists, getListById, getTodayTodos, updateListItem } from '../../api/apiMethods';
import { ListInfo } from '../ListInfo/ListInfo';
import { DeleteOutlined  } from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { TodayInfo } from '../TodayInfo/TodayInfo';

export function Home() {
    let navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [listInfoData, setListInfoData] = useState({ name: "Alex", todoItems: [] });
    const [showListInfo, setShowlistInfo] = useState(false);
    const [showTodayInfo, setShowTodayInfo] = useState(false);

    const fetchData = async () => {
        const response = await getAllLists();
        const data = await response.json();
        setMyData(data);
    }
    const iconStyle = { fontSize: '36px', color: '#08c' };

    const upDateItem = async (e, list) => {
        e.stopPropagation();
        navigate(`/changeList/${list.listId}`);
    }

    const deleteItem = async (e, id) => { 
        e.stopPropagation();
        const response =  await fetch(`api/list/${id}`, {
            method: 'DELETE',
        });
        
        if (response.status === 200) {
            fetchData();
        }
    }

    const currentListHandler = async (e, id) => {
        e.stopPropagation();
        const data = await getListById(id);
        setListInfoData(data);
        setShowlistInfo(true);
        setShowTodayInfo(false);
    }

    const todayListHandler = async () => {
        const data = await getTodayTodos();
        setListInfoData({ ...listInfoData, todoItems: data });
        setShowTodayInfo(true);
        setShowlistInfo(false);
    }

    const listWithoutCurrentId = (id) => {
        return listInfoData.todoItems.filter((item) => item.todoId !== id)
    }

    const deleteAndUpdateTodosInList = async(id) => {
        console.log('deleted' + id);
        const response = await deleteTodoById(id);
        if (response.status === 200) {
            const newList = listWithoutCurrentId(id);
            setListInfoData({ ...listInfoData, todoItems: newList });
        }
    }
    
    const addAndUpdateTodosInList = async(todo) => {
        const data = await getListById(todo.TodoListId);
        setListInfoData(data);
    }
    const statusUpdate = async (id) => {
        const response = await changeStatusOfTodo(id);
        if (response.status === 200) {
            const currentItem = listInfoData.todoItems.filter((item) => item.todoId === id)[0];
            currentItem.completed = !currentItem.completed;
            console.log(currentItem);
            console.log(listWithoutCurrentId(id));
            const newList = [...listWithoutCurrentId(id), currentItem];
            setListInfoData({ ...listInfoData, todoItems: newList });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cls.list}>
            <CategoryForm setData={setMyData} />
            <div className={cls.list__mainwrapper}>
                <div className={cls.list__wrapper}>
                    <div className={cls.list__item}
                        onClick={() => todayListHandler()}
                    >
                        <div className={cls.list__name}>Today</div>
                    </div>
                    {
                        myData.map(function (item, index) {
                            return (
                                <div key={item.listId} className={cls.list__item}
                                    onClick={(e) => currentListHandler(e, item.listId)}
                                >
                                    <div className={cls.list__name}>{item.name}</div>
                                    
                                    <div className={cls.list__btnwrapper}>
                                        <span onClick={(e) => deleteItem(e, item.listId)} >
                                            <DeleteOutlined style={iconStyle} />
                                        </span>
                                        <span onClick={(e) => upDateItem(e, item)}>
                                            <EditOutlined style={iconStyle} />
                                        </span>
                                        
                                    </div>


                                </div>
                            );
                        })
                    }
                </div>
                {
                    showTodayInfo === true ?
                        <TodayInfo data={listInfoData}
                            deleteTodo={deleteAndUpdateTodosInList}
                            addTodo={addAndUpdateTodosInList}
                            statusUpdate={statusUpdate}
                        />
                        :
                        <div></div>
                }
                {
                showListInfo === true ?
                    <ListInfo data={listInfoData}
                        deleteTodo={deleteAndUpdateTodosInList}
                        addTodo={addAndUpdateTodosInList}
                        statusUpdate={statusUpdate}
                    />
                    :
                    <div></div>
                }
               
            </div>
            
        </div>
    )
}
/*{
    showListInfo === true ?
        <ListInfo data={listInfoData}
            deleteTodo={deleteAndUpdateTodosInList}
            addTodo={addAndUpdateTodosInList}
            statusUpdate={statusUpdate}
        />
        :
        <div></div>
}*/