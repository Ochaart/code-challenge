import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('rendering', () => {
    render(<CreateAccount />);
    fetchMock
      .once(JSON.stringify({result: false}))
      .once(JSON.stringify({result: true}))
    const username = screen.getByLabelText('Username')
    const password = screen.getByLabelText('Password')
    userEvent.type(username, 'michael.perez')
    userEvent.type(password, '!1asdk;lljasdjllkjhaljdlkjlkjad')
    userEvent.click(screen.getByText('Create Account'));
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: JSON.stringify({password: '!1asdk;lljasdjllkjhaljdlkjlkjad'}),
      method: 'POST',
    })
    // expect(fetchMock).toBeCalledWith('/api/create_new_account', {
    //   body: JSON.stringify({username: "", password: ""}),
    //   method: 'POST',
    // });
  });
});
