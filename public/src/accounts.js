
function findAccountById(accounts, id) {
  const account = accounts.find((account) => account.id === id);
  if (account) {
    return account;
  } else {
    throw new Error(`No ID: ${id}`);
  }

}

function sortAccountsByLastName(accounts) { 
  return accounts.sort((accountA, accountB) =>
    accountA.name.last < accountB.name.last ? -1 : 1
  );}

function getTotalNumberOfBorrows(account, books) {
   const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    const borrowCount = book.borrows.filter(
      (transaction) => transaction.id === accountId
    ).length;
    return totalBorrows + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
   const accountId = account.id;
  return books
    .filter((book) =>
      book.borrows.some(
        (transaction) => transaction.id === accountId && !transaction.returned
      )
    )
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
