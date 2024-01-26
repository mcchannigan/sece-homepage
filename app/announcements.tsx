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
    const [openModal, setOpenModal] = useState(ModalState.CLOSED)
  
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
      setOpenModal(ModalState.TIMESHEET)
    }

    function handleSeceContactInfoOpen(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        setOpenModal(ModalState.SECE)
      }
  
    function handleContactInfoClose(): void {
      setOpenModal(ModalState.CLOSED)
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
        <span className="contact-wrapper">
            <a href="#" onClick={handleSeceContactInfoOpen}><span>Campus and <strong><em>sece</em></strong> Contact Info</span></a>
            <a href="#" onClick={handleTsContactInfoOpen}><span>Timesheet Contact Info</span></a>
        </span>
        <ReactModal isOpen={openModal !== ModalState.CLOSED} onRequestClose={handleContactInfoClose}>
          {openModal === ModalState.TIMESHEET ? <TimesheetContact/> : <SeceContactInfo data={data}/>}
        </ReactModal>
      </section>
    )
  }