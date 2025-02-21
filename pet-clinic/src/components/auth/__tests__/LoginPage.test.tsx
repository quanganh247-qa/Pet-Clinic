import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../LoginPage';

describe('LoginPage', () => {
  beforeEach(() => {
    // Clear any previous renders
    render(<LoginPage />);
  });

  it('renders the login form with all elements', () => {
    // Check for logo
    expect(screen.getByAltText('Digitail')).toBeInTheDocument();
    
    // Check for title
    expect(screen.getByText('Veterinary Software')).toBeInTheDocument();
    
    // Check for form elements
    expect(screen.getByPlaceholderText('demo.gp@digitail.io')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    // Try to submit empty form
    fireEvent.click(submitButton);
    
    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText('Please input your email!')).toBeInTheDocument();
      expect(screen.getByText('Please input your password!')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const emailInput = screen.getByPlaceholderText('demo.gp@digitail.io');
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    // Enter invalid email
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(submitButton);
    
    // Check for validation message
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email!')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Get form elements
    const emailInput = screen.getByPlaceholderText('demo.gp@digitail.io');
    const passwordInput = screen.getByPlaceholderText('Password');
    const rememberCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    // Fill form
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(rememberCheckbox);
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Verify console.log was called with form data
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Success:', {
        email: 'test@example.com',
        password: 'password123',
        remember: true
      });
    });
    
    consoleSpy.mockRestore();
  });

  it('toggles password visibility', async () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = passwordInput.parentElement?.querySelector('.ant-input-password-icon');
    
    expect(toggleButton).toBeInTheDocument();
    
    if (toggleButton) {
      // Initially password should be hidden
      expect(passwordInput.getAttribute('type')).toBe('password');
      
      // Click toggle button
      await userEvent.click(toggleButton);
      
      // Password should be visible
      expect(passwordInput.getAttribute('type')).toBe('text');
      
      // Click toggle button again
      await userEvent.click(toggleButton);
      
      // Password should be hidden again
      expect(passwordInput.getAttribute('type')).toBe('password');
    }
  });

  it('has remember me checkbox checked by default', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('has working forgot password link', () => {
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    expect(forgotPasswordLink).toHaveAttribute('href', '#');
  });
}); 