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

    function toggleInfo(e: React.MouseEvent): void {
        e.preventDefault();
        setExpanded(!expanded)
    }

    let fullName = name
    let subContactInfo = contactInfo
    const contactArr = contactInfo.split('\n')
    if(contactArr.length > 0) {
        fullName = contactArr.shift()!.replaceAll('*', '')
        subContactInfo = contactArr.join('\n')
    }
    const orgClass = "org-contact-info" + (expanded ? " active" : "")

    return (
        <li className="campus-info-box">
            <button aria-label="Expand campus info" onClick={toggleInfo}>{expanded ? '-' : '+'}</button> 
            <a href={url} target="_blank" rel="noopener noreferrer" onClick={toggleInfo}>{fullName}</a>
            <span className={orgClass}><Markdown>{subContactInfo}</Markdown></span>
        </li>
    )
}