
const reviews = [
    {
      id: 1,
      name: 'susan smith',
      job: 'web developer',
      image:
        'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
      text:
        "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'anna johnson',
      job: 'web designer',
      image:
        'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',
      text:
        'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'peter jones',
      job: 'intern',
      image:
        'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
      text:
        'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'bill anderson',
      job: 'the boss',
      image:
        'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',
      text:
        'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
  ];
  
  const Review = () => {

    const [index, setIndex] = React.useState(0)
    const { id, name, job, image, text } = reviews[index]
    
    const checkCondicional = (numberIndex) => {
        if(numberIndex > reviews.length - 1) {
            return 0
        }
        if(numberIndex < 0) {
            return reviews.length - 1
        }
        return numberIndex
    }

    const nextPerson = () => {
      setIndex( (index) => {
        let valueIndex = index + 1
        return checkCondicional(valueIndex)   
      })
      
  }

    const prevPerson = () => {
        setIndex( (index) => {
          let valueIndex = index - 1
          return checkCondicional(valueIndex)
        })
        
    }

    const randomPerson = () => {
      let randomNumber = Math.floor(Math.random() * reviews.length)
      if (randomNumber === index) {
        randomNumber = index + 1
      }
      setIndex(checkCondicional(randomNumber))
    }

    

    

    return (
        <article className="review">
            <div className="img-container">
                <img src={image} alt={name} className="person-img"></img>
                {/* <span className="quote-icon"></span> */}
            </div>
            <h4 className="author">{name}</h4>
            <p className="job">{job}</p>
            <p className="info">{text}</p>
            <div className="button-container">
            <button className="prev-btn" onClick={prevPerson}>-</button>
            <button className="next-btn" onClick={nextPerson}>+</button>
            </div>
            <button className="random-btn" onClick={randomPerson}>Random</button>
        </article>
        
    )
  }


const App = () => {

    return (
        <main>
            <section className="container">
                <div className="title">
                    <h2>Our reviews</h2>
                    <div className="underline"></div>
                </div>
                <button></button>
                <Review />
            </section>
        </main>
  )
}



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)