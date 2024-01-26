'use client'

import Markdown from "react-markdown";
import { CampusLinksProps } from "./campusLinks";

export default function SeceContactInfo({data} : CampusLinksProps) {
    const campusInfo = data.map(campus => 
        <li key={campus['orgId']}><Markdown>{campus['contactInfo']}</Markdown></li>
    )
    return (
        <div id="contact-info-container">
            <h2><strong><em>sece</em> Contact Information</strong></h2>
            <p> For all problems with the website, such as accessing the site or logging in, 
                or general non-technical problems, contact <a href="mailto:sece-help@lists.hawaii.edu">sece-help@lists.hawaii.edu</a>.
            </p>
            <ul className="campus-contact-list">
                {campusInfo}
            </ul>
        </div>
    )
}