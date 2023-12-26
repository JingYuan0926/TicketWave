import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PgRoutes from './PgRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/*" element={<PgRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
