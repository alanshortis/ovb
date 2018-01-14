function _gramTemplate(link, thumb, thumb2x) {
  return `
    <div>
      <a href="${link}">
        <img src="${thumb}" srcset="${thumb2x} 2x" alt="@ovbcycling on Instagram">
      </a>
    </div>
  `;
}


export function amstergram() {
  const user = 1473021812;
  const token = '1473021812.9826de0.ceed01805c6a40b0a0680473956f8a6a';
  const count = 6;
  const gramContainer = document.getElementById('js-instagram');
  const scriptElement = document.createElement('script');

  window._renderGrams = response => {
    response.data.forEach(gram => {
      gramContainer.insertAdjacentHTML(
        'beforeend',
        _gramTemplate(gram.link, gram.images.low_resolution.url, gram.images.standard_resolution.url)
      );
    });
    document.getElementById('js-spinner').style.display = 'none';
    document.getElementById('js-load-more').style.display = 'block';
  };

  scriptElement.setAttribute('src', `https://api.instagram.com/v1/users/${user}/media/recent/?access_token=${token}&count=${count}&callback=_renderGrams`);
  document.body.appendChild(scriptElement);
}
