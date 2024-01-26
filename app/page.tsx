'use client'

import LinkSection from './linkSection'
import Announcements from './announcements';
import CampusLinks from './campusLinks';
import { useState, useEffect } from 'react';

export default function Home() {
  const [campusData, setCampusData] = useState([])
  useEffect(() => {
      (async () => {
          const data = await (
              await fetch(`${process.env.NEXT_PUBLIC_LINK_ENDPT}/campuses`)
          ).json()
          setCampusData(data)
      })()
  }, [])
  
  return (
    <main id="main-container">
      <span className="header-wrapper">
        <h1>University of Hawai&#699;i System: <strong><em>sece</em></strong></h1>
        <p>Welcome to our online job services for students and employers.</p>
      </span>
      <span className="login-button"><a href="https://sece.its.hawaii.edu/sece">Log In Here!</a></span>
      <div className="top-wrapper">
        <CampusLinks data={campusData}/>
        <Announcements data={campusData}/>
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

