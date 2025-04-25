// src/components/BookList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <Link 
          to="/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Book
        </Link>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <li key={book.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {book.imageUrl ? (
                      <img 
                        src={book.imageUrl} 
                        alt={book.title}
                        className="h-16 w-12 object-cover mr-4" 
                      />
                    ) : (
                      <div className="bg-gray-200 h-16 w-12 flex items-center justify-center mr-4">
                        <span className="text-gray-500 text-xs">No image</span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-medium text-indigo-600">
                        <Link to={`/books/${book.id}`} className="hover:underline">
                          {book.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                      {book.genre && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          {book.genre}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/edit/${book.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-center text-gray-500">
              No books found. Try a different search term or add a new book.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookList;