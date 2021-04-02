import error404 from "../../images/404.png";
import style from "./notFound.module.css";

const NotFound = (props) => {
  const {status} = props.match.params;
  console.log(status);
  return (
    <div className={style.notFound}>
      <div><h1>Not Found  "{status}" </h1></div> 
      <div><img style={{width: "600px", height: "350px"}} src={error404}/></div>
    </div>
  )
}

export default NotFound;