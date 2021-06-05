class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  register(email, name, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  }

  getSavedArticles(token) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
  }

  saveArticle(article, token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
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

  deleteArticle(id, token) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "https://www.api.explorenews.students.nomoreparties.site",
});


export default mainApi;
