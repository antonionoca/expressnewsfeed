const axios = require('axios');

class Reddit {

  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.items = [];
  }

  get() {
		return axios.get(this.url)
		.then((response) => {
			this.items = response.data.data.children.map(obj => obj.data);
		})
		.catch((error) => console.log(error));		
  }
}

module.exports = Reddit;
