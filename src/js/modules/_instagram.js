function _gramHtml(link, thumb, largeThumb) {
  return `
    <li>
      <a href="${link}">
        <img src="${thumb}" srcset="${largeThumb} 2x" alt="@ovbcycling on Instagram">
      </a>
    </li>
  `;
}

let fired = false;

function igFeed() {
  if (fired) return;
  fired = true;

  const user = 1473021812;
  const token = '1473021812.4c0225d.aaa48611504b4784b7e9cae49f95554c';
  const count = 6;
  const grams = [];
  const gramContainer = document.getElementById('js-instagram');

  fetch(`https://api.instagram.com/v1/users/${user}/media/recent/?access_token=${token}&count=${count}`)
    .then(response => response.json())
    .then(json => grams.push(...json.data))
    .then(() => {
      grams.forEach(gram => {
        gramContainer.insertAdjacentHTML(
          'beforeend',
          _gramHtml(gram.link, gram.images.low_resolution.url, gram.images.standard_resolution.url)
        );
      });
      document.getElementById('js-spinner').style.display = 'none';
    });
}

module.exports = {
  go: igFeed
};
