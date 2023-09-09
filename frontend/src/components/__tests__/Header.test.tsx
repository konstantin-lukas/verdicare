import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer'
import Header from '../Header';
import App from '../../App';
describe('Header', () => {

   it('renders the header component', () => {
       render(<Header/>);
       expect(screen.getByPlaceholderText('Look for a plant')).toBeInTheDocument();
   });
   it('can change the site language', () => {
       render(
           <App>
               <Header/>
           </App>
       );
       fireEvent.click(screen.getByTestId('de'));
       expect(screen.queryByPlaceholderText('Look for a plant')).not.toBeInTheDocument();
       expect(screen.getByPlaceholderText('Suche nach einer Pflanze')).toBeInTheDocument();
   });
   it('renders correctly', () => {
       const tree = renderer
           .create(
               <App>
                   <Header/>
               </App>
           ).toJSON();
       expect(tree).toMatchSnapshot();
   });
});