
const url = 'https://course-api.com/react-tabs-project';

const App = () => {

    const [cargar, setCargar] = React.useState(true);
    const [jobs, setJobs] = React.useState([]);
    const [value, setValue] = React.useState(0);

    const fetchData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        setJobs(data)
        setCargar(false)
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    if(cargar) {
        return <section className="section loading">
            <h1>Cargando...</h1>
            </section>
    }
    
   const { dates,company,title,duties } = jobs[value];

  return (
    <section className="section">
        <div className="title">
            <h2>Experiencia</h2>
            <div className="underline"></div>
        </div>
        <div className="jobs-center">
            {/* button */}
            <div className="btn-container">
                {
                    jobs.map( (el,index) => {
                        return <button 
                                    key={el.id}
                                    onClick={ () => setValue(index) }
                                    className={`job-btn ${ (index === value) && "active-btn"}`}>
                                        {el.company}
                                </button>
                    })
                }
            </div>
            <article className="job-info">
                <h3>{title}</h3>
                <h4>{company}</h4>
                <p className="job-date">{dates}</p>
                {
                    duties.map( (el,index) => {
                        return <div key={index} className="job-desc">{el}</div>
                    })
                }
            </article>
        </div>
    </section>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)