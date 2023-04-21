import UserModel from "../models/User.js";
import MovieModel from "../models/Movie.js";

export const create = async (req, res) => {
  try {
    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
    });

    const user = await doc.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not create user",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.params.id;

    UserModel.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json({ message: "User deleted" });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Could not delete user",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not create user",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("watched").exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not login",
    });
  }
};

export const addWatchedFilms = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.watched.push(req.body.watched);
    await user.save();

    return res.status(200).json({
        message: "Movies added",
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not mark film as watched",
    });
  }
};

export const getWatchedFilms = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("watched").exec();

    res.json({
        watched: user.watched,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not get watched films",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("watched").exec();

    if (users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve users",
    });
  }
};


export const seeder = async () => {
  try {
    //удаление перед заполнением, чтобы избежать копий
    await MovieModel.deleteMany();
    await UserModel.deleteMany();

    const films = [
      new MovieModel({
        title: "Star Trek: The Motion Picture",
        year: 1979,
        director: "Robert Wise",
        tagline: "The human adventure is just beginning",
        genres: ["Sci-Fi", "Adventure", "Mystery"],
      }),
      new MovieModel({
        title: "Rear Window",
        year: 1954,
        director: "Alfred Hitchcock",
        tagline: "In deadly danger... because they saw too much",
        genres: ["Mystery", "Thriller"],
      }),
      new MovieModel({
        title: "They Live",
        year: 1988,
        director: "John Carpenter",
        tagline: "They control what you see. They decide what you hear.",
        genres: ["Action", "Horror", "Sci-Fi"],
      }),
    ];

    MovieModel.insertMany(films)
      .then(() => {
        console.log("Films seeded");
      })
      .catch((err) => {
        console.log("Error seeding films");
      });

    // console.log(await MovieModel.find().then((data) => data[0]?._id));

    // const users = [
    //   new UserModel({
    //     username: "login123",
    //     email: "test@email.com",
    //     watched: [
    //       await MovieModel.find().then((data) => data[0]?._id),
    //       await MovieModel.find().then((data) => data[1]?._id),
    //     ],
    //   }),
    //   new UserModel({
    //     username: "samplenickname",
    //     email: "12345@movies.com",
    //     watched: [await MovieModel.find().then((data) => data[2]?._id)],
    //   }),
    //   new UserModel({
    //     username: "admin",
    //     email: "admin23455@movies.com",
    //     watched: [await MovieModel.find().then((data) => data[2]?._id)],
    //   }),
    // ];

    // UserModel.insertMany(users)
    //   .then(() => {
    //     console.log("Users seeded");
    //   })
    //   .catch((err) => {
    //     console.log("Error seeding users");
    //   });
  } catch (err) {
    console.log(err);
  }
};
