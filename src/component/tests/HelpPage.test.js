import React from 'react';
import { render, screen } from '@testing-library/react';
import HelpPage from '../HelpPage';

describe('Test HelpPage component', () => {
  test('test Welcome to Help page label', () => {
    render(<HelpPage />);

    const labelElement = screen.getByLabelText('Welcome to HelpPage !!', { exact: false });
    expect(labelElement).toBeInTheDocument();
  });
});
