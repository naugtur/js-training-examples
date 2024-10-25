const getRandomItem = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function getUserInfo(name) {
  return {
    name: getRandomItem(["John", "Alice", "Michael"]),
    email: `${name}@example.com`,
    age: getRandomNumber(18, 65),
    location: getRandomItem(["New York", "London", "Tokyo"]),
    occupation: getRandomItem(["Engineer", "Teacher", "Artist"]),
    hobbies: getRandomItem([
      ["reading", "eating"],
      ["reading", "running"],
    ]),
    favoriteColor: getRandomItem(["blue", "red", "green"]),
    favoriteFood: getRandomItem(["pizza", "sushi", "burger"]),
    gender: getRandomItem(["male", "female"]),
    education: getRandomItem([
      "High School",
      "Bachelors degree",
      "Masters degree",
    ]),
    pets: getRandomItem([
      ["dog", "cat"],
      ["cat", "bird"],
      ["dog", "hamster"],
    ]),
    favoriteBook: getRandomItem([
      "The Great Gatsby",
      "To Kill a Mockingbird",
      "Pride and Prejudice",
    ]),
    favoriteMovie: getRandomItem([
      "Inception",
      "The Shawshank Redemption",
      "The Matrix",
    ]),
  };
}

function composeAStoryAboutUser(user) {
  return `Once upon a time, there was a user named ${user.name}. ${
    user.name
  } was a ${user.age}-year-old ${user.gender} who lived in ${
    user.location
  }. They worked as an ${user.occupation} and had a ${user.education}. ${
    user.name
  }'s favorite color was ${user.favoriteColor} and their favorite food was ${
    user.favoriteFood
  }. In their free time, ${user.name} enjoyed ${user.hobbies.join(
    ", "
  )}. They had ${user.pets.length} pets, including a ${user.pets.join(
    " and a "
  )}. ${user.name}'s favorite book was ${
    user.favoriteBook
  } and their favorite movie was ${user.favoriteMovie}.`;
}

module.exports = async function userStory(request) {
  const users = request.activeUsers;
  const name = users.current;
  users[name] = getUserInfo(name, users);

  return composeAStoryAboutUser(users[name]);
};
