import { expect } from '@jest/globals';
import createAccount from '../../src/functions/createAccount';
import fetchMock from 'jest-fetch-mock';

describe('createAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('should return true if user input meets all requirements', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({result: true}))
    const result = await createAccount('michael.perez', '!1asdk;lljasdjllkjhaljdlkjlkjad');
    expect(result).toBe(true);
  });
  test('should return false if user input does not meet all requirements', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({result: false}))
    const result = await createAccount('anything', 'wrongpassword');
    expect(result).toBe(false);
  });
  test('catches errors', async () => {
    fetchMock.mockReject(() => Promise.reject('API FAILURE'));
    await expect(createAccount('hello', 'hello')).rejects.toMatch('API FAILURE')
  })
})