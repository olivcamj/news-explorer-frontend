class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  register(email, name, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
    )
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
  }

  async getUser(token) {
    return await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
  }

  async getSavedArticles(token) {
    return await fetch(`${this._baseUrl}/articles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
  }

  async saveArticle(article, token) {
    return await fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
    })
  }

  async deleteArticle(id, token) {
  return await fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  }
};

const mainApi = new MainApi({
  baseUrl: 'https://www.api.explorenews.students.nomoreparties.site',
  //baseUrl: 'http://localhost:3001',
});


export default mainApi;
