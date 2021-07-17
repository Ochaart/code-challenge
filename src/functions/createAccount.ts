import { server } from '../../config';

const createAccount = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${server}/api/create_new_account`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    const { result } = await response.json()
    return result;
  } catch (err) {
    throw err;
  }
}

export default createAccount;