import { icLocation, icLinkedIn, icGitHub, icEmail } from "../assets";

export default function ContactList() {
  return (
    <ul>
        <li>
            <img src={icLocation} alt="Location" />
            <span>Los Angeles, CA</span>
        </li>
        <li>
            <img src={icLinkedIn} alt="LinkedIn" />
            <a
                href="https://www.linkedin.com/in/pkyoo"
                target="_blank"
                rel="noreferrer"
            >
                Linked In
            </a>
        </li>
        <li>
            <img src={icGitHub} alt="GitHub" />
            <a
                href="https://github.com/PKYOO-116"
                target="_blank"
                rel="noreferrer"
            >
                GitHub
            </a>
        </li>
        <li>
            <img src={icEmail} alt="Email" />
            <a href="mailto:pkyoo116@gmail.com">pkyoo116@gmail.com</a>
        </li>
    </ul> 
  );
}