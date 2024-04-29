import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js";
import './App.css';
import Header from './components/Header';
import Masonry from '@mui/lab/Masonry';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'; // Importa componentes de Material-UI

const api = createApi({
  accessKey: "tzqrKmpUZTntOzQoicUqip6YUa3BXKi-RossyjXBoaI"
});

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.search.getPhotos({ query: 'music', orientation: 'portrait', perPage: 20 })
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
      <Masonry columns={4} spacing={2}>
        {data && data.results && data.results.map(photo => (
          <Card key={photo.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={photo.urls.small}
              alt={photo.alt_description}
              sx={{ borderRadius: 'inherit' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {photo.alt_description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}

export default App;
