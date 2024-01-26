import { useState, useEffect } from "react"
import { Status } from "./utils"
import ReactModal from "react-modal"
import TimesheetContact from "./timesheetContact"
import SeceContactInfo from "./seceContactInfo"
import { CampusLinksProps } from "./campusLinks"

enum ModalState {
    CLOSED,
    SECE,
    TIMESHEET
}

export default function Announcements({data} : CampusLinksProps) {
    const [announcementData, setAnnouncementData] = useState([])
    const [loaded, setLoaded] = useState(Status.PENDING)
    const [modalState, setModalState] = useState(ModalState.CLOSED)
  
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
  
    function handleTsContactInfoOpen(e: React.MouseEvent<HTMLAnchorElement>): void {
      e.preventDefault()
      setModalState(ModalState.TIMESHEET)
    }

    function handleSeceContactInfoOpen(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        setModalState(ModalState.SECE)
      }
  
    function handleContactInfoClose(): void {
      setModalState(ModalState.CLOSED)
    }
  
    const announcementItems = announcementData.map(announcement => 
      <li key={announcement['id']}>{announcement['message']}</li>
    )
  
    return (
      <section id="announcements">
        <h2>Announcements</h2>
        <ul>
          <li><strong>SYSTEM UNAVAILABLE WEEKDAYS:</strong> <br/>
            2:00 am - 3:00 am (backup)</li>
          {loaded ? announcementItems : (<li><span className="text-preloader"></span></li>) }
        </ul>
        <span className="contact-wrapper">
            <a href="#" onClick={handleSeceContactInfoOpen}><img src="/feather-black/mail.svg" alt="email icon"/> <span><strong><em>sece</em></strong> Contact Info</span></a>
            <a href="#" onClick={handleTsContactInfoOpen}><img src="/feather-black/clock.svg" alt="clock icon"/> <span>Timesheet Contact Info</span></a>
        </span>
        <ReactModal isOpen={modalState !== ModalState.CLOSED} onRequestClose={handleContactInfoClose}>
          {modalState === ModalState.TIMESHEET ? <TimesheetContact/> : <SeceContactInfo data={data}/>}
        </ReactModal>
      </section>
    )
  }