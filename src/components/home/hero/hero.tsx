import styles from "./hero.module.css";
import { useParams } from "react-router-dom";
import { translations } from "@/components/translations";

const Hero: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";

  return (
    <div className={styles.heroDiv}>
      <div>
        <h1>{translations[currentLang].home.hero.welcomeheader}</h1>
        <p>{translations[currentLang].home.hero.messege}</p>
        <button>
          <span>{translations[currentLang].home.hero.button}</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
