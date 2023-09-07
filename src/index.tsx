import React from 'react';
import './main.scss';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import ContentWrapper from './components/ContentWrapper';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <App>
                <Header/>
                <ContentWrapper>
                    <SearchResults/>
                </ContentWrapper>
                <Footer/>
            </App>
        ),
        errorElement: (
            <App>
                <Header/>
                <ContentWrapper>
                    <div>
                        An error occurred
                    </div>
                </ContentWrapper>
                <Footer/>
            </App>
        )
    }, {
        path: 'plant/:id',
        element: (
            <App>
                <Header/>
                <ContentWrapper>
                    <div>
                        Hello, world!
                    </div>
                </ContentWrapper>
                <Footer/>
            </App>
        )
    }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
