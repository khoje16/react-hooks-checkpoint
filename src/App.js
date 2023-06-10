import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list d-flex justify-center m-5">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

const Filter = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    onFilterChange(event.target.value, rate);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
    onFilterChange(title, event.target.value);
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="number"
        placeholder="Filter by rating"
        value={rate}
        onChange={handleRateChange}
      />
    </div>
  );
};

const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'The Batman',
      description: 'Cause he is batman...',
      posterURL: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c8d00285589377.62b3592b33837.png',
      rating: 8.2,
    },
    {
      title: 'Jumanji',
      description: 'We got the rock and kevin hart so you gotta watch it',
      posterURL: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8d745285589377.62b359292d30f.png',
      rating: 7.1,
    },
    // Add more movies here
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilterChange = (title, rate) => {
    const filtered = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(title.toLowerCase()) &&
        movie.rating >= rate
      );
    });
    setFilteredMovies(filtered);
  };

  const handleAddMovie = () => {
    const newMovie = {
      title: 'New Movie',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      posterURL: '',
      rating: 4.2,
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  return (
    <div className="p-5">
      <h1>My Movie App</h1>
      <button onClick={handleAddMovie}>Add Movie</button>
      <Filter onFilterChange={handleFilterChange} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
