const btnShorten = document.querySelector('#btn_shorten');
const inputUrl = document.querySelector('#input_shorten');
const outputShorten = document.getElementById('text_short_url');
const outputShortenContainer = document.getElementById('short_url_container');
const copyIcon = document.getElementById('copy_icon');
const inputError = document.getElementById('input_error');

const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.%]+$/;

btnShorten.addEventListener('click', () => {
    if (isInputValid()) {
        shortenUrl(inputUrl.value);
    } else {
        validateAndShowError();
    }
});

inputUrl.addEventListener('input', () => {
    inputUrl.value = inputUrl.value.trim();
    validateAndShowError();
});

copyIcon.addEventListener('click', () => {
    copyToClipboard();
    document.getElementById('toast_copy').open();
});

/**
 * Checks if Input is valid URL.
 * @return {Boolean}
 */
function isInputValid() {
    return inputUrl.value.length != 0 && pattern.test(inputUrl.value);
}

/**
 * Validate Input and show error, if invalid URL.
 */
function validateAndShowError() {
    inputError.innerText = (inputUrl.value.length == 0) ? '' : 'Invalid URL';

    if (isInputValid()) {
        inputError.classList.remove('visible');
    } else {
        inputError.classList.add('visible');
    }
}

/**
 * Copies shortened URL to clipboard.
 */
function copyToClipboard() {
    let textarea = document.createElement('textarea');
    textarea.style.left = '-100px';
    textarea.value = outputShorten.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

/**
 * Show Short URL.
 * @param {String} shortUrl
 */
function showShortUrl(shortUrl) {
    outputShorten.innerText = `http://localhost:7001/${shortUrl})`;
    outputShorten.setAttribute('href', `http://localhost:7001/${shortUrl})`);
    outputShortenContainer.classList.add('visible');
}

/**
 * Calls the Shorten-Url API.
 * @param {String} fullUrl
 */
function shortenUrl(fullUrl) {
    const request = {
        'url': fullUrl,
    };

    fetch('http://localhost:7001/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(request),
        })
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then((response) => response.json())
        .then((data) => {
            showShortUrl(data.shortCode);
        })
        .catch((error) => {
            console.log('Request failed', error);
        });
}
