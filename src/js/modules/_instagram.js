function _gramTemplate(link, thumb, thumb2x) {
  return `
    <div>
      <a href="${link}">
        <img src="${thumb}" srcset="${thumb2x} 2x" alt="@ovbcycling on Instagram">
      </a>
    </div>
  `;
}


function amstergram() {

  const user = 1473021812;
  const token = '1473021812.9826de0.ceed01805c6a40b0a0680473956f8a6a';
  const count = 6;
  const gramContainer = document.getElementById('js-instagram');
  const scriptElement = document.createElement('script');

  window._renderGrams = (response) => {
    const grams = response.data;
    grams.forEach(gram => {

      // The thumbnail URL contains a parameter to crop the images so we use that and replace the dimensions.
      let thumb = gram.images.thumbnail.url.replace('s150x150/', 's320x320/');
      let thumb2x = gram.images.thumbnail.url.replace('s150x150/', 's640x640/');

      gramContainer.insertAdjacentHTML(
        'beforeend',
        _gramTemplate(gram.link, thumb, thumb2x)
      );
    });
    document.getElementById('js-spinner').style.display = 'none';
    document.getElementById('js-load-more').style.display = 'block';
  }

  scriptElement.setAttribute('src', `https://api.instagram.com/v1/users/${user}/media/recent/?access_token=${token}&count=${count}&callback=_renderGrams` );
  document.body.appendChild(scriptElement);
}

module.exports = {
  load: amstergram
};
