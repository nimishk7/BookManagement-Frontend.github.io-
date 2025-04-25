// src/pages/BookDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError('Failed to fetch book details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error || 'Book not found'}</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">{book.title}</h1>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Back to Books
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
            {book.imageUrl ? (
              <img 
                src={book.imageUrl} 
                alt={book.title}
                className="h-40 w-32 object-cover mr-6 mb-4 md:mb-0" 
              />
            ) : (
              <div className="bg-gray-200 h-40 w-32 flex items-center justify-center mr-6 mb-4 md:mb-0">
                <span className="text-gray-500">No image</span>
              </div>
            )}
            
            <div>
              <p className="text-lg mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
              {book.publishYear && <p className="mb-2"><span className="font-semibold">Published:</span> {book.publishYear}</p>}
              {book.genre && <p className="mb-2"><span className="font-semibold">Genre:</span> {book.genre}</p>}
              <p className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  book.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {book.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>
          </div>
          
          {book.description && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/edit/${book.id}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Edit Book
          </button>
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this book?')) {
                try {
                  await bookService.deleteBook(book.id);
                  navigate('/');
                } catch (err) {
                  console.error(err);
                  alert('Failed to delete book. Please try again.');
                }
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;