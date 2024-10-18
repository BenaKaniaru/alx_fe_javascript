const quoteInput = document.getElementById('newQuoteText');
const categoryInput = document.getElementById('quoteCategory');
const addButton = document.getElementById('addQuote');
const showQuote = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');

let quotes = [{ 
      text: "The only limit to our realization of tomorrow is our doubts of today.", 
      category: "Motivation" 
    }, { 
      text: "Life is 10% what happens to us and 90% how we react to it.",
      category: "Life" 
    }, { 
      text: "Success usually comes to those who are too busy to be looking for it.", 
      category: "Success"
    }
  ];


function createAddQuoteForm (){
  let newQuote = quoteInput.value;
  let quoteCategory = categoryInput.value;

  if (newQuote && quoteCategory) {
    quotes.push({
      text: newQuote,
      category: quoteCategory
    });

    document.getElementById('newQuoteText').value = '' //clears the input field
    document.getElementById('quoteCategory').value = '' // clears the input field;
    alert('Quote Added Successfully!')
  } else {
    alert ('Please input both fields!')
  }
}

addButton.addEventListener('click', createAddQuoteForm);

function showRandomQuote() {
  quoteDisplay.innerHTML =''

  let randomIndex = Math.floor(Math.random() * quotes.length);
  const generatedQuote = quotes[randomIndex];

  const displayedQuote = document.createElement('span');

  displayedQuote.innerHTML= `"${generatedQuote.text}" - <em>${generatedQuote.category}</em>`;

  quoteDisplay.appendChild(displayedQuote);
}


showQuote.addEventListener('click', showRandomQuote)

