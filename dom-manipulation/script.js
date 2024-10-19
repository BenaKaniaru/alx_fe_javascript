const quoteInput = document.getElementById('newQuoteText');
const categoryInput = document.getElementById('quoteCategory');
const addButton = document.getElementById('addQuote');
const showQuote = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');

let quotes = JSON.parse(localStorage.getItem('quotes')) || [{ 
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
  let newQuote = quoteInput.value.trim();
  let quoteCategory = categoryInput.value.trim();

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
  };

  localStorage.setItem('quotes', JSON.stringify(quotes));
}

addButton.addEventListener('click', createAddQuoteForm);

function showRandomQuote() {
  quoteDisplay.innerHTML =''

  let randomIndex = Math.floor(Math.random() * quotes.length);
  const generatedQuote = quotes[randomIndex];

  const displayedQuote = document.createElement('span');

  displayedQuote.innerHTML= `"${generatedQuote.text}" - <em>${generatedQuote.category}</em>`;

  quoteDisplay.appendChild(displayedQuote);

  console.log(generatedQuote.text, generatedQuote.category);
}


showQuote.addEventListener('click', showRandomQuote);

//function to export quotes as JSON
function exportQuotesToJSON() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url =URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

exportBtn.addEventListener('click', exportQUotesToJson);

// Function to import quotes from JSON file

function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // Merge imported quotes with existing ones
    saveQuotes(); // Save the updated quotes array to localStorage
    alert('Quotes imported successfully!');
  };
  
  fileReader.readAsText(event.target.files[0]);
}

// Add event listener to the import file input
importInput.addEventListener('change', importFromJsonFile);
