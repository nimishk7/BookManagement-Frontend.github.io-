// src/pages/AddBookPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { bookService } from '../services/api';

const AddBookPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddBook = async (bookData) => {
    try {
      await bookService.createBook(bookData);
      navigate('/');
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Book</h1>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Back to Books
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <BookForm onSubmit={handleAddBook} />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;