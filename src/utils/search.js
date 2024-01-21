const API_KEY = 'gd82nyfm9mfjzgykpx6zyv8x';
import axios from 'axios';

export default {
  async search (searchKey, searchType = 'SMART') {
    try {
      const ISBN = searchType === 'ISBN' ? searchKey : null;
      const books = await this.getSearchList(ISBN);
      console.log('data', books);
      return this.searchBy(books, searchKey, searchType);
    } catch (error) {
      console.error(error);
    }
  },

  async getSearchList(ISBN = null) {
    //const searchByAuthor = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?api_key=${API_KEY}`;
    //const searchByTitle = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search/views/ant?q=Sales&api_key=${API_KEY}`;
    const smartSearch = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles?api_key=${API_KEY}`;
    const searchByISBN = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${ISBN}?api_key=${API_KEY}`;
    const apiURL = ISBN ? searchByISBN : smartSearch;
    return await axios.get(apiURL)
      .then((response) => {
        return response.data.data.titles;
      })
  },

  searchBy (data, searchKey, searchType) {
    let matches = {
      allMatches: [],
      exactMatch: []
    }
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
        matches = data;
    }

    return matches;
  },

  searchByAuthor (matches, data, searchKey) {
    data.forEach((item) => {
      if(item.author === searchKey) {
        matches.exactMatch.push(item);
      } else if(item.author.includes(searchKey)) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  },

  searchByTitle (matches, data, searchKey) {
    data.forEach((item) => {
      if(item.title === searchKey) {
        matches.exactMatch.push(item);
      } else if(item.title.includes(searchKey)) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  },

  searchBySmart (matches, data, searchKey) {
    data.forEach((item) => {
      if(item.title === searchKey || item.author === searchKey || item.isbn.toString() === searchKey) {
        matches.exactMatch.push(item);
      } else if(item.title.includes(searchKey) || item.author.includes(searchKey) || item.isbn.toString().includes(searchKey)) {
        matches.allMatches.push(item);
      }
    });

    return matches;
  }

};
