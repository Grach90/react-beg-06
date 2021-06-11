import styles from "./about.module.css";
import foto from '../../images/CV_Nalbandyan.jpg';



const About = () => {
  return (
    <div className={styles.main}>
      <div>
        <img className={styles.foto} src={foto} alt="About me"/>
      </div>
    </div>
  )
}

export default About;