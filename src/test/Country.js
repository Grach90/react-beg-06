
function Country({isArmenia, chengeCountry}) {
    return(
        <div className={isArmenia ? 'Armenia' : 'USA'}>
            <p>{isArmenia ? 'Armenia' : 'USA'}</p>
            <button onClick={chengeCountry}>
            chengeCountry   
            </button>
        </div>
    )
}

export default Country;