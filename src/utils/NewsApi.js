class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  async getCardList(request, from, to) {
    return await fetch(
      `${this._baseUrl}?language=en&q=${request}&from=${from}&to=${to}&pageSize=100&sortBy=popularity&apiKey=${this._apiKey}`,
      {
        headers: {
          authorization: `Bearer ${this._apiKey}`,
        },
      }
    )
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
    )
  }
}

const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
  apiKey: "11c734fad8f44c19ba1abbf6c3478776",
});

export default newsApi;