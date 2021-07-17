import { server } from '../../config';

const checkIfExposedPass = async (password: string): Promise<boolean> => {
  try {
    const isExposed = await fetch(`${server}/api/password_exposed`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    const { result } = await isExposed.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export default checkIfExposedPass;