const KEY = "239d6575035b9c0a50bcf2003232f43d";

const tmbd = {
  async search(searchTerm, page) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
};

export default tmbd;
