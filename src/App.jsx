// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white text-center text-black p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Book Management System</h1>
          </div>
        </nav>
        
        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;