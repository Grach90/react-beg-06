import styles from "./about.module.css";
import Zoom from 'react-reveal/Roll';



const About = () => {
  return (
    <div className={styles.div1}>
      <div className={styles.div2}>
        <h1>
        HELLO!
        </h1>
          <h1>
          <Zoom top cascade >
          THIS IS MY
          </Zoom>
          </h1>
        
        <h1>
        <Zoom top cascade >
        FIRST REACT PROJECT ;)
        </Zoom>
        </h1>
      </div>
    </div>
  )
}

export default About;