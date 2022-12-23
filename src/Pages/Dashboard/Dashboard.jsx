import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as api from '../../api';
function Dashboard() {
  const {
    data: bookshelves,
    error,
    status: bookshelfStatus,
  } = useQuery('bookshelves', api.getPopularBookshelf);
  return (
    <div>
      <div></div>
      {/* popular booshelves section */}
      <div>
        <h2>Popular Bookshelves</h2>
        {bookshelfStatus === 'loading' && <div>Loading...</div>}
        {bookshelfStatus === 'error' && <div>Error: {error.message}</div>}
        {bookshelfStatus === 'success' && (
          <div className="flex flex-row overflow-auto">
            {bookshelves.map((bookshelf) => (
              <div key={bookshelf.id} className="p-8 bg-slate-500">
                <h3>{bookshelf.name}</h3>
                <p>total books: {bookshelf._count.books}</p>
                <p>total forks: {bookshelf._count.userForks}</p>
              </div>
            ))}
          </div>
        )}
        <Link to="/bookshelves">See all bookshelves</Link>
      </div>
      {/* Recomended Books */}
      <div>
        <h2>Recomended Books</h2>
      </div>
    </div>
  );
}

export default Dashboard;
