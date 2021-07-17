import { expect } from '@jest/globals';
import checkIfExposedPass from '../../src/functions/checkIfExposedPass';
import fetchMock from 'jest-fetch-mock';

describe('checkIfExposedPass', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('should return true if password is exposed', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({result: true}))
    const result = await checkIfExposedPass('weakpass');
    expect(result).toBe(true);
  });
  test('should return false if password is not exposed', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({result: false}))
    const result = await checkIfExposedPass('anythingelse');
    expect(result).toBe(false);
  })
  test('catches errors', async () => {
    fetchMock.mockReject(() => Promise.reject('API FAILURE'));
    await expect(checkIfExposedPass('hello')).rejects.toMatch('API FAILURE')
  })
})