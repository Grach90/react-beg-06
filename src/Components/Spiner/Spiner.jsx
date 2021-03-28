import style from './spiner.module.css';

const Spiner = () => {
  return (
  <div className={style.spinerDiv}>
           <div className={style.loader}>Loading..</div>
  </div>
  )
}

export default Spiner;