import { useState, useEffect } from "react"
import CampusInfo from "./campusInfo"

export default function CampusLinks() {
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
            <li key={i} className="campus-info-box">
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