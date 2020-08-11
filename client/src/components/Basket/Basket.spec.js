import React from 'react';
import Basket from './Basket';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
test('Component "Basket" is mount', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Basket />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
