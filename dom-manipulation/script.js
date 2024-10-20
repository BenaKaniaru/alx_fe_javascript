const quoteInput = document.getElementById('newQuoteText');
const categoryInput = document.getElementById('quoteCategory');
const addButton = document.getElementById('addQuote');
const showQuote = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');
const importInput = document.getElementById('importJSON');

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" }
];

// Function to add a new quote
function createAddQuoteForm() {
  let newQuote = quoteInput.value.trim();
  let quoteCategory = categoryInput.value.trim();

  if (newQuote && quoteCategory) {
    quotes.push({
      text: newQuote,
      category: quoteCategory
    });

    document.getElementById('newQuoteText').value = ''; // Clear input field
    document.getElementById('quoteCategory').value = ''; // Clear input field

    populateCategories();
    alert('Quote Added Successfully!');
  } else {
    alert('Please input both fields!');
  }

  localStorage.setItem('quotes', JSON.stringify(quotes));
}

addButton.addEventListener('click', createAddQuoteForm);

// Function to show a random quote
function showRandomQuote() {
  filterQuotes();
}

showQuote.addEventListener('click', showRandomQuote);

// Function to export quotes as JSON
function exportQuotesToJSON() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

document.getElementById('exportJSON').addEventListener('click', exportQuotesToJSON);

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // Merge imported quotes with existing ones
    localStorage.setItem('quotes', JSON.stringify(quotes));
    alert('Quotes imported successfully!');
  };

  fileReader.readAsText(event.target.files[0]);
}

// Add event listener to the import file input
importInput.addEventListener('change', importFromJsonFile);

// Function to populate categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes by category and show a random one
function filterQuotes() {
  quoteDisplay.innerHTML = '';
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const generatedQuote = filteredQuotes[randomIndex];
    const displayedQuote = document.createElement('span');
    displayedQuote.innerHTML = `"${generatedQuote.text}" - <em>${generatedQuote.category}</em>`;
    quoteDisplay.appendChild(displayedQuote);
  } else {
    quoteDisplay.innerHTML = 'No quotes available for the selected category.';
  }
}

// Simulate fetching quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const serverQuotes = await response.json();

    const updatedQuotes = serverQuotes.map(quote => ({
      text: quote.title,
      category: 'Fetched from Server'
    }));

    syncWithServer(updatedQuotes);
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Periodically fetch data every 60 seconds
setInterval(fetchQuotesFromServer, 60000);

// Sync local data with server data and resolve conflicts
function syncWithServer(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  serverQuotes.forEach(serverQuote => {
    const localIndex = localQuotes.findIndex(localQuote => localQuote.text === serverQuote.text);

    if (localIndex > -1) {
      const resolvedQuote = handleConflict(localQuotes[localIndex], serverQuote);
      localQuotes[localIndex] = resolvedQuote; // Update with resolved quote
    } else {
      localQuotes.push(serverQuote); // Add new server quote
    }
  });

  localStorage.setItem('quotes', JSON.stringify(localQuotes));
  quotes = localQuotes; // Update local array
  notifyUser("Data synced successfully with conflict resolution.");
  populateCategories();
}

// Handle conflict between local and server data
function handleConflict(localQuote, serverQuote) {
  const userChoice = confirm(`Conflict detected for quote "${localQuote.text}". Do you want to keep the server version?`);
  return userChoice ? serverQuote : localQuote;
}

// Notify users when data is synced
function notifyUser(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

document.getElementById('syncData').addEventListener('click', fetchQuotesFromServer);

// Initial population of categories
populateCategories();