


const Tour = ( { id,image,name,info,price,removerTours } ) => {
  
  const [readMore, setReadMore] = React.useState(false);

  return (
    <article className="single-tour">
        <img src={image} alt={name}></img>
        <footer>
          <div className="tour-info">
            <h4>{name}</h4>
            <h4 className="tour-price">${price}</h4>
          </div>
          <p>{ readMore ? info : `${info.substring(0,200)}...` }</p>
          <button onClick={ () => setReadMore(!readMore)}>{`${readMore ? "show less" : "read more"}`}</button>
          <button 
          className="delete-btn"
          onClick={ () => removerTours(id)}>not Interested</button>
        </footer>
    </article>
  )

}


//Componente Cargando
const Cargando = () => {

  return (
    <div className="loading">
        <h1>Loading...</h1>
    </div>
  )
}


//Componente Tours
const Tours = ( { tours, removerTours } ) => {
  
  return (
    <section>
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map(el => {
          return <Tour key={el.id} {...el} removerTours={removerTours}/>
        })}
      </div>
    </section>
  )
}




const url = "https://course-api.com/react-tours-project"

const App = () => {

  const [cargar, setCargar ] = React.useState(true)
  const [tours, setTours] = React.useState([])

  const removerTours = (id) => {
    const newTours = tours.filter(el => el.id !== id);
    setTours(newTours)
  }

  const fetchAPITours = async () => {
    setCargar(true)

    try {
      const urlFetch = await fetch(url);
      const responseTours = await urlFetch.json();
      setCargar(false);
      setTours(responseTours);
      console.log(tours);
    } catch (error) { 
      setCargar(false);
      console.log(error);

    }
  };

  React.useEffect(() => {
    fetchAPITours()
}, []);
  

  if (cargar) {
    return ( 
     <main> 
        < Cargando /> 
     </main> 
    )
  }

  if (tours.length === 0) {
    return ( <main>
      <div className="title">
        <h2>no tours left</h2>
        <button 
        className="btn" 
        onClick={ fetchAPITours }>refresh</button>
      </div>
    </main>
    )
  }

  return (
    <main> 
        <Tours tours={tours} removerTours={removerTours}/>
    </main>

  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

