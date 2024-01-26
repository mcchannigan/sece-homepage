import Markdown from "react-markdown";
import { CampusLinksProps } from "./campusLinks";

export default function SeceContactInfo({data} : CampusLinksProps) {
    const campusInfo = data.map(campus => 
        <li key={campus['orgId']}><Markdown>{campus['contactInfo'].replaceAll('\n', '\n\n')}</Markdown></li>
    )
    return (
        <div id="contact-info-container" className="info-text">
            <p> For all problems with the website, such as accessing the site or logging in, 
                or general non-technical problems, contact <a href="mailto:sece-help@lists.hawaii.edu">sece-help@lists.hawaii.edu</a>.
            </p>
            <ul>
                {campusInfo}
            </ul>
        </div>
    )
}