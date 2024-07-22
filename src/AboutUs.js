import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="aboutus-container">
      <header className="aboutus-header">
        <h1>{t('about_us_title')}</h1>
        <p>{t('about_us_description')}</p>
      </header>

      <section className="aboutus-section">
        <h2>{t('our_mission')}</h2>
        <p>{t('mission_text')}</p>
      </section>

      <section className="aboutus-section">
        <h2>{t('our_values')}</h2>
        <ul>
          <li><strong>{t('value_inclusivity')}</strong> {t('value_inclusivity_text')}</li>
          <li><strong>{t('value_community')}</strong> {t('value_community_text')}</li>
          <li><strong>{t('value_excellence')}</strong> {t('value_excellence_text')}</li>
        </ul>
      </section>

      <section className="aboutus-section">
        <h2>{t('our_history')}</h2>
        <p>{t('history_text')}</p>
      </section>

      <section className="aboutus-section">
        <h2>{t('meet_our_team')}</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={process.env.PUBLIC_URL+"/images/avatar-male.png"} alt={t('john_doe')} />
            <h2>{t('john_doe')}</h2>
            <p>{t('head_trainer')}</p>
          </div>
          <div className="team-member">
            <img src={process.env.PUBLIC_URL+"/images/avatar-female.png"} alt={t('jane_smith')} />
            <h2>{t('jane_smith')}</h2>
            <p>{t('nutritionist')}</p>
          </div>
          <div className="team-member">
            <img src={process.env.PUBLIC_URL+"/images/avatar-female.png"} alt={t('emily_johnson')} />
            <h2>{t('emily_johnson')}</h2>
            <p>{t('CEO')}</p>
          </div>
        </div>
      </section>

      <section className="aboutus-section">
        <h2>{t('our_facilities')}</h2>
        <div className="facilities">
          <div className="facility">
            <img src={process.env.PUBLIC_URL+"/images/Pool.jpg"} alt={t('swimming_pool')} />
            <h3>{t('swimming_pool')}</h3>
          </div>
          <div className="facility">
            <img src={process.env.PUBLIC_URL+"/images/basketcourt.webp"} alt={t('basketball_court')} />
            <h3>{t('basketball_court')}</h3>
          </div>
          <div className="facility">
            <img src={process.env.PUBLIC_URL+"/images/tenniscourt.jpg"} alt={t('tennis_court')} />
            <h3>{t('tennis_court')}</h3>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>{t('join_our_community')}</h2>
        <p>{t('join_community_text')}</p>
        <Link to="/signup" className="cta-button">{t('sign_up_now')}</Link>
      </section>
    </div>
  );
}

export default AboutUs;
