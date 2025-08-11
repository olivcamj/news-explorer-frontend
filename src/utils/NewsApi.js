class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  async getCardList(request, from, to) {
    return fetch(
      `${this._baseUrl}?language=en&q=${request}&from=${from}&to=${to}&pageSize=100&sortBy=popularity&apiKey=${this._apiKey}`,
      {
        headers: {
          authorization: `Bearer ${this._apiKey}`,
        },
      }
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
    );
  }
}

const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_NEWS_API_PROD
    : import.meta.env.VITE_NEWS_API_DEV;

const newsApi = new NewsApi({
  baseUrl: newsApiBaseUrl,
  apiKey: newsApiKey,
});

export default newsApi;
