const express = require('express');
const q = require('q');
const Reddit = require('./Reddit');
const Rss = require('./Rss');

const app = express();
const feeds = [
	new Rss('TheJournal', 'http://www.thejournal.ie/feed/'),
	new Rss('Independent', 'https://www.independent.ie/breaking-news/irish-news/?service=Rss'),
	new Rss('SiliconRepublic', 'https://www.siliconrepublic.com/category/careers/feed'),
	new Reddit('/r/nba', 'https://www.reddit.com/r/nba.json'),
	new Reddit('/r/programming', 'https://www.reddit.com/r/programming.json'),
	new Reddit('/r/ireland', 'https://www.reddit.com/r/ireland.json')
];

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {

	var promises = [];
	for (var feed of feeds) { 
		promises.push(feed.get());
	}

	q.all(promises)
	.then(function(results) {
		res.render('index', { feeds: feeds });
	});
});

app.listen(3000, () => console.log('App listening on port 3000'));
