'use client'

import Image from 'next/image'
import LinkSection from './linkSection'
import CampusInfo from './campusInfo'
import { Status } from './utils'
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <main id="main-container">
      <div className="top-wrapper">
        <span className="header-wrapper">
          <h1>University of Hawai&#699;i System</h1>
          <p>Welcome to our online job services for students and employers.</p>
        </span>
        <span className="login-button"><a href="https://sece.its.hawaii.edu/sece">Log In Here!</a></span>
      </div>
      
        <Announcements/>
        <CampusLinks/>
      
      <div className="section-links-wrapper">
        <LinkSection title='University Employers' linkLocation='home-uh'/>
        <LinkSection title='Non-University Employers' linkLocation='home-nonuh'/>
        <LinkSection title='Students' linkLocation='home-std'/>
      </div>
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
      campusInfoItems.push(<li className="campus-info-box">Loading...</li>)
    }
  }

  return (
    <section id="campus-links">
      <h2>Campus Links</h2>
      <ul>{campusInfoItems}</ul>
    </section>
  )
}

function Announcements() {
  const [announcementData, setAnnouncementData] = useState([])
  const [loaded, setLoaded] = useState(Status.PENDING)

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

  const announcementItems = announcementData.map(announcement => 
    <li key={announcement['id']}>{announcement['text']}</li>
  )

  return (
    <section id="announcements">
      <h2>Announcements</h2>
      <ul>
        <li><strong>SYSTEM UNAVAILABLE WEEKDAYS:</strong> <br/>
          2:00 am - 3:00 am (backup)</li>
        {loaded ? announcementItems : (<li>Loading...</li>) }
      </ul>
    </section>
  )
}