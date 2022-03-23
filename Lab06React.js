
const SCREEN_SIZE = 100
const ELEMENT_SIZE = 100

const cardsImg = [
  { "src":"./imagenes/Ardilla.png", Coincidencia: false },
  { "src":"./imagenes/Crecer.png", Coincidencia: false },
  { "src":"./imagenes/Estrella.png", Coincidencia: false },
  { "src":"./imagenes/Gato.png", Coincidencia: false },
  { "src":"./imagenes/Hielo.png", Coincidencia: false },
  { "src":"./imagenes/Hoja.png", Coincidencia: false },
  { "src":"./imagenes/Moneda.png", Coincidencia: false },
  { "src":"./imagenes/Vida.png", Coincidencia: false }
]

const App = () => {

  //Estilos
  const Fondo = {
    width: `${SCREEN_SIZE}%`,
    height: `${SCREEN_SIZE}%`,
    background: '#A9DFBF',
    textAlign: 'center',
    margin: '0'
  }

  const Fondo2 = {
    background: '#A9DFBF',
    textAlign: 'center',
    fontFamily: 'Courier New, Courier, monospace',
    margin: '0'
  }

  const h1 = {
    fontFamily: 'Courier New, Courier, monospace',
    margin: 'auto',
    padding: '3px',
    color: '#17202A'
  }

  const Boton = {
    background: 'none',
    backgroundColor: '#34495E',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '6px 6px',
    border: '2px solid #34495E',
    fontFamily: 'Courier New, Courier, monospace'
  }

  const CartaStyle = {
    position: 'relative'
  }

  const CartaStyle2 = {
    width: '67px',
    height: '67px',
    transform: 'rotateY(90deg)',
    transition: 'all ease-in 0.2s',
    position: 'absolute'
  }

  const CartaStyle3 = {
    transform: 'rotateY(0deg)',
    transitionDelay: '0.2s',
    width: '67px',
    height: '67px'
  }

  const GridCartas = {
    marginTop: '17px',
    display: 'grid',
    gridTemplateColumns: '5fr 5fr 5fr 5fr',
    gridGap: '20px'
  }

  //Constantes para cambiar estados
  const [cartas, setCartas] = React.useState([])
  const [turnos, setTurnos] = React.useState(0)
  const [Coincidencias, setCoincidencias] = React.useState(0)
  const [Carta1, setCarta1] = React.useState(null)
  const [Carta2, setCarta2] = React.useState(null)
  const [deshabilitado, setDeshabilitado] = React.useState(false)

  //Se realiza la mezcla de cartas
  const MezclaCartas = () => {
    const CartasMezcladas = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5) //El 0.5 garantiza que tengamos valores positivos y negativos-
      .map((carta) => ({ ...carta, id: Math.random() }))
    
    setCarta1(null)
    setCarta2(null)
    setCartas(CartasMezcladas)
    setTurnos(0)
    setCoincidencias(0)
  }
  
  //Manejo de cartas escogidas
  const Manejo = (carta) => {
    Carta1 ? setCarta2(carta) : setCarta1(carta)
  }

  //Creación de cartas individuales
  function CartaInd({ carta, Manejo, Volteada, deshabilitado }) {

    //Voltear cartas
    const CLickSostenido = () => {
      if(!deshabilitado) {
        Manejo(carta)
      }
    }

    return (
      <div className="carta" style={CartaStyle}>
        <div>
          <img 
            className="Cubierta" 
            src={carta.src} alt="frenteCarta" 
            style={ Volteada ? CartaStyle3: CartaStyle2 }>
          </img>
          <img 
            className="Fondo" src="./imagenes/QuestionBlock.png" 
            alt="atrasCarta" onClick={CLickSostenido} 
            style={ Volteada ? CartaStyle2: CartaStyle3 }>
          </img>
        </div>
      </div> 
    )
  }

  //Turnos
  const ResetTurnos = () => {
    setCarta1(null)
    setCarta2(null)
    setTurnos(TurnosTot => TurnosTot + 1)
    setDeshabilitado(false)
  }

  //Comparación
  React.useEffect(() => {
    
    if (Carta1 && Carta2){
      setDeshabilitado(true)
      if(Carta1.src === Carta2.src){
        setCartas(CartaPrev => {
          return CartaPrev.map(carta => {
            if(carta.src === Carta1.src){
              setCoincidencias(TotCoinci => TotCoinci + 1)
              return {...carta, Coincidencia: true}
            } else {
              return carta
            }
          })
        })
        console.log(Coincidencias)
        ResetTurnos()
      } else {
        setTimeout(() => ResetTurnos(), 1000)
      }
    }
    
    if(Coincidencias == 16){
      alert("Felicidades, ganaste en "+ turnos + " turnos")
      setTimeout(() => MezclaCartas(), 1200)
    }

  }, [Carta1, Carta2])

  //Inicio del juego
  React.useEffect(()=>{
    MezclaCartas()
  }, [])

  return (
    <div style={Fondo}>
      <h1 style ={h1}>Amazing Memory</h1>
      <button style={Boton} onClick={MezclaCartas}>Nuevo juego</button>
      <div className = "gridCartas" style={GridCartas}>
        {cartas.map(carta => (
          <CartaInd
            key = {carta.id}
            carta = {carta}
            Manejo = {Manejo}
            Volteada={carta === Carta1 || carta === Carta2 || carta.Coincidencia}
            deshabilitado = {deshabilitado}
          />
        ))}
      </div>
      <p style={Fondo2}>Turnos: {turnos}</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)