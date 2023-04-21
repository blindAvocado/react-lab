import UserModel from "../models/User.js";
import MovieModel from "../models/Movie.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();

    if (movies.length == 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not get all movies",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new MovieModel({
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      tagline: req.body.tagline,
      genres: req.body.genres,
    });

    const movie = await doc.save();

    res.json(movie);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not add a movie",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const movieId = req.params.id;

    MovieModel.findByIdAndDelete(movieId)
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Movie not found",
          });
        }

        res.json({ message: "Movie deleted" });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Could not delete movie",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not remove a movie",
    });
  }
};

export const update = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not update a movie",
    });
  }
};
