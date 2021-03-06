// Get Data Function
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export {
  getData,
}