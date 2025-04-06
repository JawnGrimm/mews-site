import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFilter, FaNewspaper } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/">
                        <FaHome /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/filter">
                        <FaFilter /> Filter
                    </Link>
                </li>
                <li>
                    <Link to="/news">
                        <FaNewspaper /> News Feed
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;