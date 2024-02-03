import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import PrivateLayout from './layouts/PrivateLayout';
import { Provider } from 'react-redux';
import store from './store/store';

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateLayout element={<HomePage />} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;