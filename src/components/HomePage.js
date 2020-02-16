import React from 'react';
import { Layout } from './Layouts/Layout';
import NewsFeed from './NewsFeed/NewsFeed'

export const HomePage = () => (
    <Layout>
        <NewsFeed />
    </Layout>
);