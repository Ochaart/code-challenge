const checkIfExposedPass = async (password: string): Promise<boolean> => {
  try {
    const isExposed = await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    const { result } = await isExposed.json();
    return result;
  } catch (err) {
    throw new err;
  }
}

export default checkIfExposedPass;