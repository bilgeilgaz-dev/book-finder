const API_KEY = 'gd82nyfm9mfjzgykpx6zyv8x';

export default {
  async search() {
    console.log("search");
    fetch(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?api_key=${API_KEY}`)
      .then((response) => {
        console.log(response.json()); // returns the response object as JSON
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
