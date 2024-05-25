require("dotenv").config();

const mongoose = require("mongoose");

const db = require("../models");

const {
  campAdjectives,
  campNouns,
  campTypes,
  emailProviders,
  tlds,
  cities,
} = require("./data");

async function seedCamp() {
  const allUsers = await db.User.find({});
  const campArr = [];

  // Function to generate a random camp names
  for (let i = 0; i < 15; i++) {
    const adjective =
      campAdjectives[Math.floor(Math.random() * campAdjectives.length)];
    const noun = campNouns[Math.floor(Math.random() * campNouns.length)];
    const type = campTypes[Math.floor(Math.random() * campTypes.length)];
    const emailProvider =
      emailProviders[Math.floor(Math.random() * emailProviders.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    const { city, state } = cities[Math.floor(Math.random() * cities.length)];
    const imageUrl = `/img/camp-${Math.ceil(Math.random() * 15)}.jpg`;

    const title = `${adjective} ${noun} ${type}`;
    const location = `${city}, ${state}`;
    const price = Math.floor(Math.random() * 99) + 1;
    const campImage = {
      url: imageUrl,
      filename: imageUrl,
    };
    const capacity = Math.ceil(Math.random() * 100);
    const area = `${Math.ceil(Math.random() * 50)} acres`;
    const description =
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, felis fames laoreet pretium porttitor eu netus velit, sagittis accumsan ornare quam est hendrerit. Aliquet arcu nascetur mollis lobortis.";
    const contact = `${noun}.${type}@${emailProvider}${tld}`.toLowerCase();
    const website = `${noun}${type}${tld}`.toLowerCase();
    const owner =
      allUsers.length > 0
        ? allUsers[Math.floor(Math.random() * allUsers.length)]._id
        : undefined;

    const campData = {
      title,
      location,
      price,
      campImage,
      capacity,
      area,
      description,
      contact,
      website,
      owner,
    };

    campArr.push(campData);
  }
  const deletedCamp = await db.Camp.deleteMany({});
  const savedCamps = await db.Camp.insertMany(campArr);
  return savedCamps;
}

seedCamp()
  .then((data) => {
    console.log(data);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
