import { useState } from 'react'
import './App.css'

function App() {
  const [gifSrc, setGifSrc] = useState('/minionLoves.gif')
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
  const [angryLevel, setAngryLevel] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(true)

  const texts = [
    'Em có muốn đi hẹn hò với anh vào 14/2 không ạ ???',
    'Sao em lại bấm vào không ?????',
    'Bấm lại vào có nhanh =))))',
    'Anh không nói nhiều đâu =))))',
    'Ấn có đi mò =))))',
    'Ấn đi để tối mình đi hẹn hò =))',
    'Hư nhể =)))',
    '😡😡😡😡😡',
    'Yeahhhhhh 🎉🎉🎉🎉🎉, lên đồ đẹp và đợi anh qua đón nha =))'
  ]

  const handleYes = () => {
    setGifSrc('/VoTayGift.gif')
    setTextIndex(8) // Index of "Yeahhhhhh" text
    setShowButtons(false) // Hide buttons
  }

  const handleNoClick = () => {
    // Move button to random position
    const maxX = window.innerWidth - 200
    const maxY = window.innerHeight - 100
    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY
    
    setButtonPosition({ top: randomY, left: randomX })

    // Change angry gif (1 -> 5 -> 1 -> 5...)
    const nextLevel = angryLevel + 1
    const gifIndex = (nextLevel % 8) + 1
    const gifExtension = gifIndex === 7 || gifIndex === 3 || gifIndex === 6 ? 'webp' : 'gif'
    setGifSrc(`/angry${gifIndex}.${gifExtension}`)
    setAngryLevel(nextLevel)

    // Change text, but stop at last text (index 7, not 8)
    if (textIndex < 7) {
      setTextIndex(textIndex + 1)
    }
  }

  return (
    <div className="container">
      <img 
        src={gifSrc} 
        alt="Minion" 
        className="gif"
      />
      <p className="text">
        {texts[textIndex]}
      </p>
      {showButtons && (
        <div className="buttons">
          <button className="btn btn-yes" onClick={handleYes}>
            Có
          </button>
          <button 
            className="btn btn-no" 
            onClick={handleNoClick}
            style={{
              position: angryLevel > 0 ? 'fixed' : 'relative',
              top: angryLevel > 0 ? `${buttonPosition.top}px` : 'auto',
              left: angryLevel > 0 ? `${buttonPosition.left}px` : 'auto'
            }}
          >
            Không
          </button>
        </div>
      )}
    </div>
  )
}

export default App
