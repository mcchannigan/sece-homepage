import CampusInfo from "./campusInfo"

export interface CampusLinksProps {
    data: Array<any>
}

export default function CampusLinks({data} : CampusLinksProps) {


    let campusInfoItems = data.map(campus => 
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