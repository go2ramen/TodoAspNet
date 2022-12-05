import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import { ListChangeForm } from './components/ListChangeForm/ListChangeForm'

import './custom.css'
import { Counter } from './components/Counter/Counter';
import { TodoChangeForm } from './components/TodoChangeForm/TodoChangeForm';

function App() {

    return (
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/changeList/:id' element={<ListChangeForm />} />
            <Route path='/changeTodo/:id' element={<TodoChangeForm />} />
            <Route path='/counter' element={<Counter />} />
      </Routes>
    );
}

export default App;
