'use client'

import { useState, useEffect } from 'react';

interface LinkSectionProps {
    title: string
    linkLocation: string
}



export default function LinkSection({title, linkLocation} : LinkSectionProps) {
    const [links, setLinks] = useState([])
    useEffect(() => {
        (async () => {
            const data = await (
                await fetch(`${process.env.NEXT_PUBLIC_LINK_ENDPT}/links?location=${linkLocation}`)
            ).json()
            setLinks(data)
        })()
    }, [])

    const linkListItems = links.map(link => <li key={link['id']}><a href={link['url']} target="_blank" rel="noopener noreferrer">{link['name']}</a></li>);
    return (
        <section id={`link-box-${linkLocation}`} className="link-section">
            <h2>{title}</h2>
            {linkListItems.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>{linkListItems}</ul>
            )}
        </section>
    )
}