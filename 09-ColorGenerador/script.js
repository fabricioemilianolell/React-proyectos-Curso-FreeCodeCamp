

const Colors = ({ rgb, weight, index, hex }) => {

    const [alertaCopy, setAlertaCopy] = React.useState(false);

    const arrString = rgb.join(",");

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setAlertaCopy(false)
      }, 2000);
    
      return () => {
        clearTimeout(timeout)
      }
    }, [alertaCopy])

    const alertCopy = () => {
      setAlertaCopy(true);
      navigator.clipboard.writeText(`#${hex}`)
    }
    
    
return (
    <article 
        className={`color ${ (index > 10) && "color-light"}`} 
        style={{backgroundColor:`rgb(${arrString})`}}
        onClick={alertCopy}>
        <p className="percent-value">{weight}%</p>
        <p className="color-">#{hex}</p>
        {
          alertaCopy ? <p className="alert">Copiado</p> : ""
        }
    </article>
  )
}



const App = () => {

    const [colorValue, setColorValue] = React.useState("");
    const [valueError, setvalueError] = React.useState(false);
    const [arrayColor, setArrayColor] = React.useState(new Values("#250250").all(10));

    const submitColor = (e) => {
        e.preventDefault();
        try {
            // Libreria colores values.js
            let colores = new Values(colorValue).all(10)
            setArrayColor(colores)
        } catch (error) {
            setvalueError(true)
            console.log(error)
        }
    }

    React.useEffect(() => {
      const time = setTimeout(() => {
        setvalueError(false)
      }, 3000);
    
      return () => {
        clearTimeout(time)
      }
    }, [valueError])
    

  return (
    <>
    <section className="container">
        <h3>Generador de Color</h3>
        <form onSubmit={submitColor}>
            <input 
                type="text"
                value={colorValue} 
                onChange={ (e) => setColorValue(e.target.value)}
                placeholder="#f12525"
                className={`${valueError ? "error" : null }`}>
            </input>
            <button className="btn" type="submit">Submit</button>
        </form>
    </section>
    <section className="colors">
        <h4>Lista de Colores</h4>
        { valueError && <p style={{fontSize: "20px", color: "red"}}>Se requiere un valor</p>}
        {
            arrayColor.map( (el,index) => {
                const hexColor = el.hex
                return <Colors 
                        key={index} 
                        {...el} 
                        index={index} 
                        hex={hexColor} />
            })
        }
    </section>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
