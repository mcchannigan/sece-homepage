'use client'

import Markdown from 'react-markdown'
import { useState } from 'react'

interface CampusInfoProps {
    //id: number
    name: string
    url: string
    contactInfo: string
}


export default function CampusInfo({name, url, contactInfo} : CampusInfoProps) {
    const [expanded, setExpanded] = useState(false)

    function toggleInfo() {
        setExpanded(!expanded)
    }

    const orgClass = "org-contact-info" + (expanded ? " active" : "")

    return (
        <li className="campus-info-box">
            <button aria-label="Expand campus info" onClick={toggleInfo}>{expanded ? '-' : '+'}</button> 
            <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
            <span className={orgClass}><Markdown>{contactInfo}</Markdown></span>
        </li>
    )
}