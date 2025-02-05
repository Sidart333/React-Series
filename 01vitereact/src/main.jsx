import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

function MyApp() {
    return (
        <div>
            <h1>Custom App!</h1>
        </div>
    )
}

// const reactElement = {
//   type: "a",
//   props: {
//     href: "https://www.google.com",
//     target: "_blank",
//   },
//   children: "Click me to visit Google",
// }

const reactElement = React.createElement(
    'a',
    { href: 'https://www.yahoo.com', target: '_blank' },
    'Click me to visit Yahoo'
)

const anotherElement = (
    <a target='_blank' href="https://www.google.com">Visit Google</a>
)

createRoot(document.getElementById('root')).render(

    <App/>
    
  
)
