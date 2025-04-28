
import axios from 'axios';


const API_URL = 'https://book-management-seven-lime.vercel.app/';


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const bookService = {
  getAllBooks: async (filters = {}) => {
    const response = await apiClient.get('/books', { params: filters });
    return response.data;
  },
  
  getBookById: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },
  
  createBook: async (bookData) => {
    const response = await apiClient.post('/books', bookData);
    return response.data;
  },
  
  updateBook: async (id, bookData) => {
    const response = await apiClient.put(`/books/${id}`, bookData);
    return response.data;
  },
  
  deleteBook: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  }
};

export default apiClient;