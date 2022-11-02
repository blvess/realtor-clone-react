import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Sign In', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <App />
      </MemoryRouter>,
    );
  });

  it('should navigate to forgotten password page', async () => {
    const link = screen.getByTestId('forgot-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Forgot Password/i })).toBeInTheDocument();
  });

  it('should navigate to sign up page', async () => {
    const link = screen.getByTestId('sign-up-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Sign Up/i })).toBeInTheDocument();
  });
});
