const newQuoteButton = document.querySelector('#js-new-quote');
const spinner = document.querySelector('#js-spinner');
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}
function setTweetButton(quote) {
  const tweetButton = document.querySelector('#js-tweet');
  tweetButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
}
async function getQuote() {
  // remove the "hidden" class on the spinner
  spinner.classList.remove('hidden');
  // disable the quote button
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    displayQuote(json.message);
    setTweetButton(json.message);
  } catch (err) {
    // alert('Failed to fetch new quote');
    console.log(err);
  } finally {
    // enable the quote button
    newQuoteButton.disabled = false;
    // add the "hidden" class back again
    spinner.classList.add('hidden');
  }
}
newQuoteButton.addEventListener('click', getQuote);
getQuote();
