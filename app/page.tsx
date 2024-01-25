'use client'

import LinkSection from './linkSection'
import CampusInfo from './campusInfo'
import Announcements from './announcements';
import CampusLinks from './campusLinks';

export default function Home() {
  
  return (
    <main id="main-container">
      <span className="header-wrapper">
        <h1>University of Hawai&#699;i System: <strong><em>sece</em></strong></h1>
        <p>Welcome to our online job services for students and employers.</p>
      </span>
      <span className="login-button"><a href="https://sece.its.hawaii.edu/sece">Log In Here!</a></span>
      <div className="top-wrapper">
        <CampusLinks/>
        <Announcements/>
      </div>
      <div className="section-links-wrapper">
        <LinkSection title='University Employers' linkLocation='home-uh'/>
        <LinkSection title='Non-University Employers' linkLocation='home-nonuh'/>
        <LinkSection title='Students' linkLocation='home-std'/>
      </div>
      <footer>
        Copyright &copy; 2024 - University of Hawai&#699;i
      </footer>
    </main>
  )
}

