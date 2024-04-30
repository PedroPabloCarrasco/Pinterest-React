import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js";
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component'; // Importa InfiniteScroll
import Header from './components/Header';
import Masonry from '@mui/lab/Masonry';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const api = createApi({
  accessKey: "tzqrKmpUZTntOzQoicUqip6YUa3BXKi-RossyjXBoaI"
});

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // Página actual para la paginación

  useEffect(() => {
    fetchData(); // Llama a fetchData() al montar el componente
  }, []); // Solo se ejecuta una vez al montar

  const fetchData = () => {
    api.search.getPhotos({ query: 'music', orientation: 'portrait', perPage: 20, page: page }) // Agrega page al parámetro
      .then(result => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0]);
        } else {
          setData(prevData => { // Actualiza el estado de data utilizando el estado previo
            return prevData ? { ...prevData, results: [...prevData.results, ...result.response.results] } : result.response; // Combina los resultados anteriores con los nuevos
          });
          setPage(prevPage => prevPage + 1); // Incrementa la página
        }
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  };

  return (
    <div className="container">
      <Header />
      <InfiniteScroll
        dataLength={data ? data.results.length : 0} // Longitud de los datos
        next={fetchData} // Función para cargar más datos
        hasMore={true} // Indica si hay más datos para cargar
        loader={<h4>Loading...</h4>} // Componente que se muestra mientras se cargan más datos
        endMessage={<p>No more photos</p>} // Mensaje mostrado al llegar al final de los datos
      >
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
      </InfiniteScroll>
    </div>
  );
}

export default App;
