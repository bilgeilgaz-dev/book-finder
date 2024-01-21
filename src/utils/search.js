import axios from 'axios';

const API_KEY = 'gd82nyfm9mfjzgykpx6zyv8x';

export default {
  async search(searchKey, searchType = 'SMART') {
    try {
      const ISBN = searchType === 'ISBN' ? searchKey : null;
      const books = await this.getSearchList(ISBN);
      return this.searchBy(books, searchKey, searchType);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  /* async getSearchList(ISBN = null) {
    const smartSearch = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles?api_key=${API_KEY}`;
    const searchByISBN = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${ISBN}?api_key=${API_KEY}`;
    const apiURL = ISBN ? searchByISBN : smartSearch;
    return await axios.get(apiURL)
      .then((response) => response.data.data.titles);
  }, */

  async getSearchList(ISBN = null) {
    const smartSearch = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles?api_key=${API_KEY}`;
    const searchByISBN = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${ISBN}?api_key=${API_KEY}`;
    const apiURL = ISBN ? searchByISBN : smartSearch;
    try {
      const response = await axios.get(apiURL);
      return response.data.data.titles;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error if needed
    }
  },

  searchBy(data, searchKey, searchType) {
    let matches = {
      allMatches: [],
      exactMatch: [],
    };
    switch (searchType) {
      case 'SMART':
        matches = this.searchBySmart(matches, data, searchKey);
        break;
      case 'AUTHOR':
        matches = this.searchByAuthor(matches, data, searchKey);
        break;
      case 'TITLE':
        matches = this.searchByTitle(matches, data, searchKey);
        break;
      default:
        matches.exactMatch = data;
    }

    return matches;
  },

  searchByAuthor(matches, data, searchKey) {
    data.forEach((item) => {
      if (item.author.toLowerCase() === searchKey.toLowerCase()) {
        matches.exactMatch.push(item);
      } else if (item.author.toLowerCase().includes(searchKey.toLowerCase())) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  },

  searchByTitle(matches, data, searchKey) {
    data.forEach((item) => {
      if (item.title.toLowerCase() === searchKey.toLowerCase()) {
        matches.exactMatch.push(item);
      } else if (item.title.toLowerCase().includes(searchKey.toLowerCase())) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  },

  searchBySmart(matches, data, searchKey) {
    data.forEach((item) => {
      if (item.title.toLowerCase() === searchKey.toLowerCase()
        || item.author.toLowerCase() === searchKey.toLowerCase()
        || item.isbn.toString() === searchKey
      ) {
        matches.exactMatch.push(item);
      } else if (item.title.toLowerCase().includes(searchKey.toLowerCase())
        || item.author.toLowerCase().includes(searchKey.toLowerCase())
        || item.isbn.toString().includes(searchKey)
      ) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  },

};
