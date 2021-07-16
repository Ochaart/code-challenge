import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const checkLength = (passInput: string): boolean => {
  if (passInput.length >= 20 && passInput.length <= 50) {
    return true;
  } else {
    return false;
  }
}

const checkForSymbol = (char: string) => {
  if (["!", "@", "#", "$", "%"].includes(char)) {
    return true;
  }
}

const checkForLetter = (char: string): boolean => {
  if (char.toLowerCase() != char.toUpperCase()) {
    return true;
  }
}

const checkForNumber = (char: string): boolean => {
  if (!isNaN(parseFloat(char)) && isFinite(Number(char))) {
    return true;
  }
}

const checkPassRequirements = (passInput: string): boolean => {
  let result = checkLength(passInput)
  let symbolResult = false;
  let letterResult = false;
  let numberResult = false;
  for (const char of passInput) {
    symbolResult = symbolResult || checkForSymbol(char);
    letterResult = letterResult || checkForLetter(char);
    numberResult = numberResult || checkForNumber(char)
  }
  return result && symbolResult && letterResult && numberResult
}

const checkUserRequirements = (usernameInput: string): boolean => {
  if (usernameInput.length >= 10 && usernameInput.length <= 50) {
    return true;
  } else {
    return false;
  }
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password }: CreateNewAccountParameters = JSON.parse(req.body);
  if (checkPassRequirements(password) && checkUserRequirements(username)) {
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
}
