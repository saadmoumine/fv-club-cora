import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './context/CartContext';
import { useTranslation } from 'react-i18next';

function Header({ loggedInUser, setLoggedInUser, accountType }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSignOut = () => {
    setLoggedInUser(null);
  };

  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="logo">ClubCora</div>
      <nav className="nav">
        <ul>
          <li><Link to="/Home">{t('home')}</Link></li>
          <li className="dropdown">
            <Link to="/about">{t('about_us')}</Link>
          </li>
          <li className="dropdown">
            <Link to="/Activities">{t('activities')}</Link>
            <ul className="dropdown-content">
              <li><Link to="/tennis">{t('tennis')}</Link></li>
              <li><Link to="/football">{t('football')}</Link></li>
              <li><Link to="/basketball">{t('basketball')}</Link></li>
              <li><Link to="/swimming">{t('swimming')}</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/boutique">{t('boutique')}</Link>
          </li>
          <li><Link to="/contact">{t('contact_us')}</Link></li>
        </ul>
      </nav>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')} className="lang-button">EN</button>
        <button onClick={() => changeLanguage('fr')} className="lang-button">FR</button>
      </div>
      <div className="user-actions">
        {loggedInUser ? (
          <>
            <Link
              to={accountType === 'member' ? '/member-profile' : '/instructor-profile'}
              className="profile-icon"
            >
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </Link>
            <button className="sign-out-button" onClick={handleSignOut}>{t('sign_out')}</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="sign-in-button">{t('sign_in')}</Link>
            <Link to="/login" className="sign-in-button">{t('log_in')}</Link>
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
