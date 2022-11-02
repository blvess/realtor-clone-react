import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Render all pages', () => {
  it('renders a homepage', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('heading', { level: 1, name: /Home/i })).toBeDefined();
  });

  it('renders a forgot password page', () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Forgot Password')).toBeDefined();
  });

  it('renders a profile page', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Profile')).toBeDefined();
  });

  it('renders a offers page', () => {
    render(
      <MemoryRouter initialEntries={['/offers']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getAllByText('Offers')).toBeDefined();
  });

  it('renders a sign-in page', () => {
    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getAllByText('Sign In')).toBeDefined();
  });

  it('renders a sign-up page', () => {
    render(
      <MemoryRouter initialEntries={['/sign-up']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Sign Up')).toBeDefined();
  });
});
