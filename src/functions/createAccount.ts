const createAccount = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    const { result } = await response.json()
    return result;
  } catch (err) {
    throw new err;
  }
}

export default createAccount;