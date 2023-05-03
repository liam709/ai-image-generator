import './styles.css'
import { useState } from 'react';
import {Configuration, OpenAIApi} from 'openai';


//Go to url: https://platform.openai.com/account/api-keys
//Register your own API key and fill below.
const configuration = new Configuration({
  apiKey: 'YOUR_API_KEY'
})

const openai = new OpenAIApi(configuration);

function App() {

const [images, setImages] = useState([])
const [prompt, setPrompt] = useState('')
const [isLoading, setIsLoading] = useState(false);

async function fetchData(){

  try {
    setIsLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512"
    })
    console.log('Response data', response.data.data)
    //setImages(response.data)
    setImages(response.data.data)
    setIsLoading(false);

  } catch (e){
    setIsLoading(false);
    console.log(e)
  }
  console.log('images', images)
  
}

  return (
    <div className = 'App'>
      <div className = 'title'>
        <h1>AI Image Generator</h1>
      </div>
      <div className = 'text-area'>
        <textarea placeholder = 'Describe the image to generate.' onChange = {(e) => setPrompt(e.target.value)} className = 'text-box'></textarea>
        <button onClick = {fetchData} className = 'submit-button'>Submit</button>
      </div>
      <div className = 'is-loading'>
      {isLoading ? (
        <>
          <p>Loading images...</p>
          <br/>
          <p>This may take a few moments...</p>
        </>
      ) : (
        <div> {images.map((image) => (
          <img className = 'img' src = {image.url}/>
        ))}</div>
      )}
      </div>
    </div>
  );
}

export default App;
