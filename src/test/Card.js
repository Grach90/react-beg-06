
function Card({obj: {imgUrl, imgAlt, text}}){
    
    
    return (
        <div className= "card" >
            <img src={imgUrl} alt={imgAlt} />
            <p>{text}</p>
        </div>
    )
}
  
  export default Card;