import React,{useState} from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
const [toggle, setToggle] = useState(false);


    return (
        <div>
            <div onClick = {() => setToggle(!toggle)} className={`menu ${toggle ? "open" : "original"}`}>
                <div className="menu-icon"></div>
            </div>
            <div>
                <Link to="/cart"><img className="bag" src="/assets/bag.png" alt="bag"/></Link>
            </div>
            <nav>
                <ul className="navbar">
                    <li><Link className={`nav-link ${toggle ? 'open' : ''}`}to="/">Home</Link></li>
                    <li><Link className={`nav-link ${toggle ? 'open' : ''}`}to="/art">Art</Link></li>
                    <li><Link className={`nav-link ${toggle ? 'open' : ''}`}to="/about">About</Link></li>
                    <li><Link className={`nav-link ${toggle ? 'open' : ''}`}to="/photography">Photography</Link></li>
                </ul>
            </nav>
        </div>
    )
}



