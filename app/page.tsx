'use client'

import LinkSection from './linkSection'
import CampusInfo from './campusInfo'
import ReactModal from 'react-modal';
import { Status } from './utils'
import { useState, useEffect, MouseEventHandler } from 'react';
import TimesheetContact from './timesheetContact';

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

function CampusLinks() {
  const [campusData, setCampusData] = useState([])
  useEffect(() => {
    (async () => {
        const data = await (
            await fetch(`${process.env.NEXT_PUBLIC_LINK_ENDPT}/campuses`)
        ).json()
        setCampusData(data)
    })()
  }, [])

  
  let campusInfoItems = campusData.map(campus => 
    <CampusInfo key={campus['orgId']} name={campus['org']['longName']} url={campus['url']} contactInfo={campus['contactInfo']}/>
  )
  if(campusInfoItems.length === 0) {
    // Loading placeholders
    for(let i = 0; i < 10; i++) {
      campusInfoItems.push(
        <li className="campus-info-box">
          <span className="text-preloader"/>
        </li>
      )
    }
  }

  return (
    <section id="campus-links">
      <h2>Campus Links and Contact Info</h2>
      <ul>{campusInfoItems}</ul>
    </section>
  )
}

function Announcements() {
  const [announcementData, setAnnouncementData] = useState([])
  const [loaded, setLoaded] = useState(Status.PENDING)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    (async () => {
      let ok = false
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LINK_ENDPT}/announcements`)
        if(response.ok) {
          const data = await (response).json()
          setAnnouncementData(data)
          ok = true
        }
      } finally {
        setLoaded(ok ? Status.SUCCESS : Status.ERROR)
      }
    })()
  }, [])

  function handleContactInfoOpen(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault()
    setOpenModal(true)
  }

  function handleContactInfoClose(): void {
    setOpenModal(false)
  }

  const announcementItems = announcementData.map(announcement => 
    <li key={announcement['id']}>{announcement['text']}</li>
  )

  return (
    <section id="announcements">
      <h2>Announcements</h2>
      <ul>
        <li><strong>SYSTEM UNAVAILABLE WEEKDAYS:</strong> <br/>
          2:00 am - 3:00 am (backup)</li>
        {loaded ? announcementItems : (<li><span className="text-preloader"></span></li>) }
      </ul>
      <a href="#" onClick={handleContactInfoOpen}>Timesheet Contact Info</a>
      <ReactModal isOpen={openModal} onRequestClose={handleContactInfoClose}>
        <TimesheetContact/>
      </ReactModal>
    </section>
  )
}