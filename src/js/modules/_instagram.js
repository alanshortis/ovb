function _gramHtml(link, thumb, largeThumb) {
  return `
    <div class="gram-grid__item">
      <a href="${link}">
        <img src="${thumb}" srcset="${largeThumb} 2x" alt="@ovbcycling on Instagram">
      </a>
    </div>
  `;
}

let fired = false;

function igFeed() {
  if (fired) return;
  fired = true;

  const user = 1473021812;
  const token = '1473021812.4c0225d.aaa48611504b4784b7e9cae49f95554c';
  const count = 6;
  const gramContainer = document.getElementById('js-instagram');
  let maxId, scriptElement;

  window._renderGrams = (response) => {
    maxId = response.data[5].id;
    const grams = response.data;
    grams.forEach(gram => {
      gramContainer.insertAdjacentHTML(
        'beforeend',
        _gramHtml(gram.link, gram.images.low_resolution.url, gram.images.standard_resolution.url)
      );
    });
    document.getElementById('js-spinner').style.display = 'none';
    document.getElementById('js-load-more').style.display = 'block';
  }

  function _getGrams() {
    scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', `https://api.instagram.com/v1/users/${user}/media/recent/?access_token=${token}&count=${count}&max_id=${maxId}&callback=_renderGrams` );
    document.body.appendChild(scriptElement);
  }
  _getGrams();

  document.getElementById('js-load-more').addEventListener('click', _getGrams);
}

module.exports = {
  go: igFeed
};
