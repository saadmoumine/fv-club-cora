import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActivitySection from './ActivitySection';
import './Home.css';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>{t('welcome_message')}</h1>
        <p>{t('welcome_subtitle')}</p>
        <Link to="/about" className="learn-more-button">{t('learn_more_button')}</Link>
      </header>


      <section className="home-section">
        <h2>{t('why_choose_us')}</h2>
        <div className="home-info">
          <div className="home-info-item">
            <h3>{t('expert_trainers')}</h3>
            <p>{t('expert_trainers_text')}</p>
          </div>
          <div className="home-info-item">
            <h3>{t('state_of_the_art_facilities')}</h3>
            <p>{t('state_of_the_art_facilities_text')}</p>
          </div>
          <div className="home-info-item">
            <h3>{t('flexible_schedules')}</h3>
            <p>{t('flexible_schedules_text')}</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>{t('what_our_members_say')}</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>{t('testimonial_1_text')}</p>
            <h4>- {t('testimonial_1_author')}</h4>
          </div>
          <div className="testimonial">
            <p>{t('testimonial_2_text')}</p>
            <h4>- {t('testimonial_2_author')}</h4>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>{t('join_us_today')}</h2>
        <p>{t('join_us_text')}</p>
        <Link to="/signup" className="cta-button">{t('sign_up_now')}</Link>
      </section>
    </div>
  );
}

export default Home;
