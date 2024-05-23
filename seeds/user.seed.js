require("dotenv").config();

const mongoose = require("mongoose");

const db = require("../models");
const data = require("./data");

function randomDate(start, end) {
  const startTime = new Date(start);
  const endTime = new Date(end);
  return new Date(
    startTime.getTime() +
      Math.random() * (endTime.getTime() - startTime.getTime())
  );
}

async function seedUser() {
  const userArr = [];

  for (i = 0; i < 15; i++) {
    const firstname =
      data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
    const lastname =
      data.lastNames[Math.floor(Math.random() * data.lastNames.length)];
    const username = `${firstname.toLowerCase()}${Math.ceil(
      Math.random() * 20 + 11
    )}`;
    const password = `${firstname}${Math.ceil(Math.random() * 200 + 9999)}`;
    const userImage = `/img/user-${Math.ceil(Math.random() * 15)}.jpg`;
    const email = `${username}@${
      data.tlds[Math.floor(Math.random() * data.tlds.length)]
    }`;
    const birthDate = randomDate("1989-1-1", "2005-1-1");
    const about =
      "Lorem ipsum dolor sit amet consectetur, adipiscing elit accumsan venenatis.";

    const userData = {
      firstname,
      lastname,
      username,
      email,
      password,
      userImage,
      birthDate,
      about,
    };
    userArr.push(userData);
  }

  const deleteUsers = await db.User.deleteMany({});
  const usersData = await db.User.insertMany(userArr);
  return usersData;
}

seedUser()
  .then((data) => {
    console.log(data);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
