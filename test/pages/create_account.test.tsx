import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';
import { server } from '../../config'

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('succesfully create an account with correct username and password input', async () => {
    render(<CreateAccount />)
    fetchMock
      .once(JSON.stringify({ result: false }))
      .once(JSON.stringify({ result: true }))
    const username = screen.getByLabelText('Username')
    const password = screen.getByLabelText('Password')
    userEvent.type(username, 'michael.perez')
    userEvent.type(password, '!1asdk;lljasdjllkjhaljdlkjlkjad')
    userEvent.click(screen.getByText('Create Account'));
    await waitFor(() => {
      const result = screen.getByTestId('result');
      expect(username.value).toBe('michael.perez')
      expect(password.value).toBe('!1asdk;lljasdjllkjhaljdlkjlkjad')
      expect(fetchMock).toBeCalledTimes(2);
      expect(fetchMock).toBeCalledWith(`${server}/api/password_exposed`, {
        body: JSON.stringify({ password: '!1asdk;lljasdjllkjhaljdlkjlkjad' }),
        method: 'POST',
      })
      expect(fetchMock).toBeCalledWith(`${server}/api/create_new_account`, {
        body: JSON.stringify({ username: 'michael.perez', password: '!1asdk;lljasdjllkjhaljdlkjlkjad' }),
        method: 'POST',
      });
      expect(result.innerHTML).toBe('Successfully created an account.')
    })
  });

  test('safe password but does not meet all requirements to create an account', async () => {
    render(<CreateAccount />)
    fetchMock
      .once(JSON.stringify({ result: false }))
      .once(JSON.stringify({ result: false }))
    const username = screen.getByLabelText('Username')
    const password = screen.getByLabelText('Password')
    userEvent.type(username, 'asdasda')
    userEvent.type(password, 'hellloooo')
    userEvent.click(screen.getByText('Create Account'));
    await waitFor(() => {
      const result = screen.getByTestId('result');
      expect(username.value).toBe('asdasda')
      expect(password.value).toBe('hellloooo')
      expect(fetchMock).toBeCalledTimes(2);
      expect(fetchMock).toBeCalledWith(`${server}/api/password_exposed`, {
        body: JSON.stringify({ password: 'hellloooo' }),
        method: 'POST',
      })
      expect(fetchMock).toBeCalledWith(`${server}/api/create_new_account`, {
        body: JSON.stringify({ username: 'asdasda', password: 'hellloooo' }),
        method: 'POST',
      });
      expect(result.innerHTML).toBe('Did not meet all requirements, please try again.')
    })
  })

  test('not safe password.', async () => {
    render(<CreateAccount />)
    fetchMock.once(JSON.stringify({ result: true }))
    const username = screen.getByLabelText('Username')
    const password = screen.getByLabelText('Password')
    userEvent.type(username, 'asdasda')
    userEvent.type(password, 'weakpass')
    userEvent.click(screen.getByText('Create Account'));
    await waitFor(() => {
      const result = screen.getByTestId('result');
      expect(username.value).toBe('asdasda')
      expect(password.value).toBe('weakpass')
      expect(fetchMock).toBeCalledTimes(1);
      expect(fetchMock).toBeCalledWith(`${server}/api/password_exposed`, {
        body: JSON.stringify({ password: 'weakpass' }),
        method: 'POST',
      })
      expect(result.innerHTML).toBe('Password is not safe, please try another.')
    })
  })
});
