const api = (() => {
  const URI = 'https://pokeapi.co/api/v2/pokemon';

  const getById = async (id) => {
    const response = await fetch(`${URI}/${id}`);
    return await response.json();
  };

  const getList = async (limit = 100000, offset = 0) => {
    const response = await fetch(`${URI}?limit=${limit}&offset=${offset}`);
    return await response.json();
  };

  return {
    getById,
    getList,
  }
})();

export default api;