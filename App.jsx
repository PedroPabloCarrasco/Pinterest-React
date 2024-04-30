import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js";
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/Header';
import Masonry from '@mui/lab/Masonry';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const api = createApi({
  accessKey: "tzqrKmpUZTntOzQoicUqip6YUa3BXKi-RossyjXBoaI"
});

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('music');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [query]); // Actualiza los datos cuando cambia el término de búsqueda

  const fetchData = () => {
    api.search.getPhotos({ query, orientation: 'portrait', perPage: 20, page })
      .then(result => {
        if (result.errors) {
          console.error('Error occurred:', result.errors[0]);
        } else {
          setData(prevData => ({
            ...prevData,
            results: page === 1 ? result.response.results : [...prevData.results, ...result.response.results]
          }));
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => {
        console.error('Something went wrong:', error);
      });
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
  };

  return (
    <div className="container">
      <Header onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={data ? data.results.length : 0}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more photos</p>}
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
