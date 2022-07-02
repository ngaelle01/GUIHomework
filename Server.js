const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000

const server = express()
const publicPath = path.join(__dirname, 'build')

// edits start
//const hwPath = path.join(__dirname, "hw")
//server.use("/hw/2", express.static(hwPath))

server.use(express.static(publicPath))
server.get("/*", (req, res)=>{
  res.sendFile(path.join(publicPath, 'index.html'))
})

server.listen(port, (err)=>{
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server Running. Listening on port ${port}`)
})



/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
