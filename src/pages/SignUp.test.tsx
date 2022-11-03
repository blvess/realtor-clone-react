import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Sign Up ', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/sign-up']}>
        <App />
      </MemoryRouter>,
    );
  });

  it('should navigate to forgotten password page', async () => {
    const link = screen.getByTestId('forgot-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Forgot Password/i })).toBeInTheDocument();
  });

  it('should navigate to sign in page', async () => {
    const link = screen.getByTestId('sign-in-link');
    fireEvent.click(link);
    expect(await screen.getByRole('heading', { level: 1, name: /Sign/i })).toBeInTheDocument();
  });

  it('should render a toast message on firebase failure', async () => {
    const signupButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signupButton);
    expect(await screen.findByText('Something went wrong with registration!')).toBeInTheDocument();
  });
});
