const quoteInput = document.getElementById('newQuoteText');
const categoryInput = document.getElementById('quoteCategory');
const addButton = document.getElementById('addQuote');
const showQuote = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');

let quotes = [{ 
      quote: "The only limit to our realization of tomorrow is our doubts of today.", 
      category: "Motivation" 
    }, { 
      quote: "Life is 10% what happens to us and 90% how we react to it.",
      category: "Life" 
    }, { 
      quote: "Success usually comes to those who are too busy to be looking for it.", 
      category: "Success"
    }
  ];

addButton.addEventListener('click', () => {
  let newQuote = quoteInput.value;
  let quoteCategory = categoryInput.value;

  if (newQuote && quoteCategory) {
    quotes.push({
      quote: newQuote,
      category: quoteCategory
    });

    document.getElementById('newQuoteText').value = '' //clears the input field
    document.getElementById('quoteCategory').value = '' // clears the input field;
    alert('Quote Added Successfully!')
  } else {
    alert ('Please input both fields!')
  }
});

function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  const generatedQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `"${generatedQuote.quote}" - <em>${generatedQuote.category}</em>`;
}

showQuote.addEventListener('click', showRandomQuote)

