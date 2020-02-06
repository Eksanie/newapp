import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';

function App() {
  const[text,setText] = useState('')
  const [memes,setMemes] = useState([])
  async function getMemes(){
    const key = "pD0ZVOQzsQJ2EkBABdH7nnKCJwuyz7JP"
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+ key
    url += '&q='+ text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
  }
  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">
        <div className = "input-wrap">
        <TextField fullWidth variant = "outlined"
          label="Search for memes!"
          value={text}
          onChange={e=> setText(e.target.value)}
          onKeyPress = {e=> {
            if(e.key === "Enter") getMemes()
          }}
        />
        <Button variant = "contained" color = "primary" onClick ={getMemes}>
          Search
        </Button>
        </div>
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
          </header>
    </div>
  );
}
function Meme(meme){
  return <div className = 'meme'>
    <img src= {meme.images.fixed_height.url} alt = "meme" />
   </div>
}
export default App;
