function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (book.borrows[0].returned === false) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre]++;
    } 
    
    else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
  .map((book) => ({ name: book.title, count: book.borrows.length }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = books.reduce((acc, book) => 
  {const author = authors.find((author) => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (acc[authorName]) {
      acc[authorName] += book.borrows.length;
    } 
    else {
      acc[authorName] = book.borrows.length;
    }
    return acc;
  }, {});

  return Object.entries(authorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
