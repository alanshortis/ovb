function igFeed() {

  const user = 1473021812;
  const token = '1473021812.4c0225d.aaa48611504b4784b7e9cae49f95554c';
  const count = 9;
  const grams = [];
  const gramContainer = document.getElementById('js-instagram');

  function gramHtml(link, thumb, alt) {
    return `
      <li>
        <a href="${link}">
          <img src="${thumb}" alt="${alt}">
        </a>
      </li>
    `;
  }

  fetch(`https://api.instagram.com/v1/users/${user}/media/recent/?access_token=${token}&count=${count}`)
    .then(response => response.json())
    .then(json => grams.push(...json.data))
    .then(() => {
      grams.forEach(gram => {
        console.log(gram);
        gramContainer.insertAdjacentHTML(
          'beforeend',
          gramHtml(gram.link, gram.images.thumbnail.url, gram.caption)
        );
      });
    });
}

module.exports = {
  feed: igFeed
};
