
const birthdays = [
  {
    id: 1,
    name: 'Bertie Yates',
    age: 29,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg',
  },
  {
    id: 2,
    name: 'Hester Hogan',
    age: 32,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-3_rxtqvi.jpg',
  },
  {
    id: 3,
    name: 'Larry Little',
    age: 36,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',
  },
  {
    id: 4,
    name: 'Sean Walsh',
    age: 34,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
  },
  {
    id: 5,
    name: 'Lola Gardner',
    age: 29,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
  },
];


//componente lista
const List = ( {personas} ) => {
  
  return (
    <>
      {
        personas.map(el => {
          const { id,name,age,image } = el;
          return <article key={id} className="person">
                    <img src={image} alt={name}></img>
                    <div>
                      <h4>{name}</h4>
                      <p>{age} years</p>
                    </div>
                </article>
        })

      }
    </>
  )
}

//componente App principal

const App = () => {

  const [personas, setPersonas] = React.useState(birthdays)

  return (
    <main>
        <section className="container">
            <h3>{personas.length} birthdays today</h3>
            <List personas={personas}/>
            <button onClick={ () => setPersonas([])}>Clear All</button>
        </section>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
