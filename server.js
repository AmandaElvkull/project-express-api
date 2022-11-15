import express from "express";
import cors from "cors";
import data from "./data/netflix-titles.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// define how many objects per site

const pagination = (data, pageNumber) => {
  const pageSize = 20
  const startIndex = (pageNumber-1) * pageSize
  const endIndex = startIndex + pageSize
  const itemsOnPage = data.slice(startIndex, endIndex)

  const returnObject = {
      page_size: pageSize,
      page: pageNumber,
      num_of_pages: Math.ceil(data.length / pagesize),
      items_on_page: booksOnPage.length,
      results: itemsOnPage
  }
  return returnObject
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Find the different movies from a netflix api build backend , /movies, /movies/title/:title, /movies/year/:year, /movies/type/:type, /random-movie");
});

app.get("/movies", (req,res) => {
  const { title, country, director, cast } = req.params; 
  let allMovies = data 
  if (title) {
    allMovies = allMovies.filter((movie) => movie.title.toLocaleLowerCase() === title.toLocaleLowerCase())
  }
  if (country) {
    allMovies = allMovies.filter((movie) => movie.country.toLocaleLowerCase().includes() === country.toLocaleLowerCase())
  }
  if (director) {
    allMovies = allMovies.filter((movie) => movie.director.toLocaleLowerCase().includes() === director.toLocaleLowerCase())
  }
  if (cast) {
    allMovies = allMovies.filter((movie) => movie.cast.toLocaleLowerCase().includes() === cast.toLocaleLowerCase())
  }
    res.status(200).json({
      data: allMovies,
      success: true,
    });
 
})

app.get("/movies/title/:title", (req, res) => {
  const { title } = req.params;
  const moviesByName = data.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  if (!moviesByName) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: moviesByName,
      success: true,
    });
  }
});

/* it´s not showing data */
app.get("/movies/year/:year", (req, res) => {
  const { release_year } = req.params;
  console.log({ release_year })
  
  const releaseYear = data.filter((item) => item.release_year === +release_year)

  if(!releaseYear) {
    res.status(404).json({
      data: "Not found",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: releaseYear,
      success: true,
    })
  }
})

// make it more clear if you looking at movies or tvshow 
app.get("/movies/type/:type", (req, res) => {
  const { type } = req.params;
  
  const typeOfMovie = data.filter((item) => item.type.toLowerCase() === type.toLowerCase())
  if(!typeOfMovie) {
    res.status(404).json({
      data: "Not found",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: typeOfMovie,
      success: true,
    })
  }
})

// random movie title
app.get("/random-movie", (req,res) => {
  const randomMovie = data[Math.floor(Math.random()* data.length)]
  if(!randomMovie) {
    res.status(404).json({
      data: "No movies like this ",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: randomMovie,
      success: true,
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


