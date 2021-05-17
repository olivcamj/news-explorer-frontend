class NewsApi {
  constructor({ baseUrl, headers }){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getCardList() {
    try {
      const res = await fetch(`${this._baseUrl}/everything`, {
        headers: this._headers,
      });
      return await (res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
    } catch (err) {
      return console.log(err);
    }
  }
}

export default NewsApi;