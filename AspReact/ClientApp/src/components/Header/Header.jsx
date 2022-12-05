import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cls from './Header.module.scss';

export const Header = () => {
    return (
        <div className={cls.header}>
            <Link to="/">
                <div className={cls.header__link}>
                    Home
                </div> 
            </Link> 
           
        </div>
    )
}
    