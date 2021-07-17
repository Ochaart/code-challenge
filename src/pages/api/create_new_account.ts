import type { NextApiRequest, NextApiResponse } from 'next';
import validators from '../../functions/validators';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const checkPassRequirements = (passInput: string): boolean  => {
  let result = validators.checkPassLength(passInput) as boolean;
  let symbolResult = false;
  let letterResult = false;
  let numberResult = false;
  for (const char of passInput) {
    symbolResult = symbolResult || validators.checkForSymbol(char) as boolean;
    letterResult = letterResult || validators.checkForLetter(char) as boolean;
    numberResult = numberResult || validators.checkForNumber(char) as boolean;
  }
  return result && symbolResult && letterResult && numberResult
}

const checkUserRequirements = (usernameInput: string): boolean => {
  return validators.checkUserLength(usernameInput) as boolean;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password }: CreateNewAccountParameters = JSON.parse(req.body);
  if (checkPassRequirements(password) && checkUserRequirements(username)) {
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
}
