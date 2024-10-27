import styles from "./home.module.css";
import Hero from "./hero";

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
};

export default Main;
