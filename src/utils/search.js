const API_KEY = 'gd82nyfm9mfjzgykpx6zyv8x';
import axios from 'axios';

export default {
  async search (searchKey, searchType = 'SMART') {
    console.log('searchType', searchType);
    console.log('searchKey', searchKey);
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
    console.log('ISBN', ISBN);
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
    let result = null;
    switch (searchType) {
      case 'SMART':
        result = this.searchBySmart(data, searchKey);
        break;
      case 'AUTHOR':
        result = this.searchByAuthor(data, searchKey);
        break;
      case 'TITLE':
        result = this.searchByTitle(data, searchKey);
        break;
      default:
        result = data;
    }
    console.log('searchBy result', result);
    return result;
  },

  searchByAuthor (data, searchKey) {
    return data.filter((item) => {
      return item.author.includes(searchKey);
    });
  },

  searchByTitle (data, searchKey) {
    return data.filter((item) => {
      return item.title.includes(searchKey);
    });
  },

  searchBySmart (data, searchKey) {
    return data.filter((item) => {
      return item.author.includes(searchKey) || item.title.includes(searchKey) || item.isbn.includes(searchKey);
    });
  }

};
