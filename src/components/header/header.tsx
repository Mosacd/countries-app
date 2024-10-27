import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { translations } from "../translations";

const Header: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ka" : "en";
    const toNavigate = `/${newLang}${location.pathname.slice(3)}`;
    navigate(toNavigate);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.titleLogo}>
          <h1>Country explorer </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="white"
          >
            <path d="M458-81q-79-4-148-37t-120-86.5q-51-53.5-80.5-124.27T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q149 0 259 94t135 236h-61q-17-84-71-150t-135-99v18q0 35-24 61t-59 26h-87v87q0 16.58-13.5 27.79T393-568h-83v88h110v125h-67L149-559q-5 20-7 39.67-2 19.66-2 39.33 0 135 91 233t227 106v60Zm392-26L716-241q-21 15-45.5 23t-50.07 8q-71.01 0-120.72-49.62Q450-309.24 450-380.12t49.62-120.38q49.62-49.5 120.5-49.5t120.38 49.71Q790-450.58 790-379.57q0 25.57-8.5 50.07T759-283l134 133-43 43ZM619.86-270Q666-270 698-301.86t32-78Q730-426 698.14-458t-78-32Q574-490 542-458.14t-32 78Q510-334 541.86-302t78 32Z" />
          </svg>
        </div>
        <ul className={styles.list}>
          <li>
            {" "}
            <Link to={""} className={styles.link}>
              {translations[currentLang].header.home}
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"Services"} className={styles.link}>
              {translations[currentLang].header.services}
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"contact"} className={styles.link}>
              {translations[currentLang].header.contact}
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"about"} className={styles.link}>
              {translations[currentLang].header.about}
            </Link>
          </li>
          <button className={styles.button} onClick={toggleLanguage}>
            {translations[currentLang].header.switch_language}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
