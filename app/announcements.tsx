import { useState, useEffect } from "react"
import { Status } from "./utils"
import ReactModal from "react-modal"
import TimesheetContact from "./timesheetContact"

export default function Announcements() {
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