import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Analyze from './pages/Analyze';
import Library from './pages/Library';

export default function App() {
  return (
    <BrowserRouter basename="/safe">
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:category" element={<Library />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
