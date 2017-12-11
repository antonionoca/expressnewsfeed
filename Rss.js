const feedparser = require('feedparser-promised');

class Rss {

  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.items = [];
  }

  get() {

    return feedparser.parse(this.url)
    .then((items) => {
      this.items = items;
    })
		.catch((error) => console.log(error));		
  }
}

module.exports = Rss;
