import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Forgot password page links', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <App />
      </MemoryRouter>,
    );
  });

  it('should navigate to forgotten password page', async () => {
    const link = screen.getByTestId('sign-in-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Sign In/i })).toBeInTheDocument();
  });

  it('should navigate to sign up page', async () => {
    const link = screen.getByTestId('sign-up-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Sign Up/i })).toBeInTheDocument();
  });
});
