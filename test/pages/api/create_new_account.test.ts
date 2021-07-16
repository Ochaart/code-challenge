import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true if username and/or password meet all requirements', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {username: 'michael.perez', password: '!1asdk;lljasdjllkjhaljdlkjlkjad'},
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns false when username and/or password doesn\'t meet all requirements', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {username: 'hello', password: ''}
    })

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
    })
  })
});
