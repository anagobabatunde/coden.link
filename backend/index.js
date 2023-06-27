const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/news', async (req, res) => {
  const lobstersNews = await fetchLobstersNews();
  const ycombinatorNews = await fetchYCombinatorNews();
  const productHuntNews = await fetchProductHuntNews();

  const allNews = [...lobstersNews, ...ycombinatorNews, ...productHuntNews];
  const shuffledNews = shuffleArray(allNews);

  res.json(shuffledNews);
});


async function fetchLobstersNews() {
  const url = 'https://lobste.rs/';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const titles = [];

  $('div.story_liner').each((i, elem) => {
    const title = $(elem).find('a.u-url').first().text();
    const link = $(elem).find('a.u-url').first().attr('href');
    const origin = 'Lobsters';
    titles.push({ title, link, origin});
  });

  return titles;
}

async function fetchYCombinatorNews() {
  const url = 'https://news.ycombinator.com/news';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const news = [];

  $('tr.athing').each((i, elem) => {
    const title = $(elem).find('.title a').text();
    const link = $(elem).find('.title a').attr('href');
    const origin = 'Hacker News';
    if (link && link.startsWith('https://')) {
      news.push({ title, link, origin});
    }
  });

  return news;
}

async function fetchProductHuntNews() {
  const url = 'https://www.producthunt.com/';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const news = [];

  $('.styles_item__Sn_12').each((i, elem) => {
    const title = $(elem).find('.styles_title__jWi91').text().trim();
    const relativeLink = $(elem).find('.styles_title__jWi91').attr('href');
    const link = `https://www.producthunt.com${relativeLink}`;
    const description = $(elem).find('.styles_tagline__j29pO').text().trim();
    const origin = 'Product Hunt';

    news.push({ title: `${title}, ${description}`, link, origin  });
  });

  return news;
}



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
