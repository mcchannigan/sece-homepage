'use client'

export default function TimesheetContact()
{
    return (
        <div id="ts-contact">
            <h2>Contact Information for the Online Timesheet Application</h2>
            <p>Although the Online Timesheet Application has been merged into the Student Employment Application, each has its own help center.
            </p>
            <p>We have provided <strong>"Help"</strong> links throughout the Online Timesheet sections of the application.  Look for
                <br/><img src="../images/std_question.gif"/> when logged in as a Student or
                <br/><img src="../images/emp_question.gif"/> when logged in as a Supervisor or Business Office.

            </p>
            <p>We also created <strong>"User Guides"</strong> for each role [STD, SUP, BO].</p>
            <p>They are located on the timesheet tab's main page.
            </p>
            <p>Two distinct email addresses are provided for help:</p>
            <ul>
            <li><a href="mailto:timesheet-help@lists.hawaii.edu">timesheet-help@lists.hawaii.edu</a>
                <br/>- Send general questions to this address.
                <br/>&nbsp;&nbsp;&nbsp;ex. How do I create a LATE timesheet?
            </li>
            <li><a href="mailto:timesheet-tech@lists.hawaii.edu">timesheet-tech@lists.hawaii.edu</a>

                <br/>- Send technical problems/questions to this address.
                <br/>&nbsp;&nbsp;&nbsp;ex. I got an error page of "HTTP Status 500 - Internal Server Error"
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What does this mean?
            </li>
            </ul>
        </div>
    )
}