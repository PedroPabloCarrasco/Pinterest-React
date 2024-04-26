import { useEffect, useState } from 'react'
import { createApi } from "unsplash-js";
import './App.css'
import Header from './components/Header'

const api = createApi({
  accessKey: "tzqrKmpUZTntOzQoicUqip6YUa3BXKi-RossyjXBoaI"
});

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.search.getPhotos({ query: 'nature', orientation: 'portrait' })
      .then(result => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0]);
        } else {
          setData(result.response);
        }
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  return (
    <div className="container">
      New Project
      <Header/>
      {data && data.results.map(photo => (
        <img src={photo.urls.small} alt={photo.alt_description} key={photo.id} />
      ))}
    </div>
  )
}

export default App
