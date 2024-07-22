import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './context/CartContext';

function Header({ loggedInUser, setLoggedInUser, accountType }) {
  const handleSignOut = () => {
    setLoggedInUser(null);
  };

  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="logo">ClubCora</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link to="/about">About Us</Link>
          </li>
          <li className="dropdown">
            ACTIVITIES
            <ul className="dropdown-content">
              <li><Link to="/tennis">Tennis</Link></li>
              <li><Link to="/football">Football</Link></li>
              <li><Link to="/basketball">Basketball</Link></li>
              <li><Link to="/swimming">Swimming</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/boutique">Boutique</Link>
          </li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        {loggedInUser ? (
          <>
            <Link
              to={accountType === 'member' ? '/member-profile' : '/instructor-profile'}
              className="profile-icon"
            >
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </Link>
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="sign-in-button">Sign In</Link>
            <Link to="/login" className="sign-in-button">Log In</Link>
          </>
        )}
        <Link to="/cart" className="cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
