import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layouts/Layout';
import NewsFeed from './components/NewsFeed/NewsFeed';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <NewsFeed />
      </Layout>
    </React.Fragment>
  );
}

export default App;