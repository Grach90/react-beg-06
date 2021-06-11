import style from './footer.module.css';
import facebook from '../../images/facebook.png';
import linkedin from '../../images/linkedin.png';
import github from '../../images/github.png';

export default function Footer() {
  return (
    <div className={style.main}>
      <div className={style.icon}>
        <a href="https://www.facebook.com/hrach.nalbandyan.5">
          <img src={facebook} className={style.foto} />
        </a>
      </div>
      <div className={style.icon}>
        <a href="https://www.linkedin.com/in/hrachya-nalbandyan-26b028210/">
          <img src={linkedin} className={style.foto} />
        </a>
      </div>
      <div className={style.icon}>
        <a href="https://github.com/Grach90/react-beg-06">
          <img src={github} className={style.foto} />
        </a>
      </div>
    </div>
  )
}