import React, { useEffect } from "react";
import styles from 'src/styles/ValidatePassword.module.scss'
import validators from '../functions/validators';

interface ValidatePasswordProps {
  password: string,
  hasCorrectPassLength: boolean,
  setHasCorrectPassLength: React.Dispatch<React.SetStateAction<boolean>>,
  hasOneSymbol: boolean,
  setHasOneSymbol: React.Dispatch<React.SetStateAction<boolean>>
  hasOneLetter: boolean,
  setHasOneLetter: React.Dispatch<React.SetStateAction<boolean>>
  hasOneNumber: boolean,
  setHasOneNumber: React.Dispatch<React.SetStateAction<boolean>>
}

const ValidatePassword = ({
  password,
  hasCorrectPassLength,
  setHasCorrectPassLength,
  hasOneSymbol,
  setHasOneSymbol,
  hasOneLetter,
  setHasOneLetter,
  hasOneNumber,
  setHasOneNumber
}: ValidatePasswordProps) : JSX.Element => {
  const checkRequirements = (passInput: string): void => {
    setHasOneSymbol(false);
    setHasOneLetter(false);
    setHasOneNumber(false);
    validators.checkPassLength(passInput, setHasCorrectPassLength) as void;
    for (const char of passInput) {
      validators.checkForSymbol(char, setHasOneSymbol) as void;
      validators.checkForLetter(char, setHasOneLetter) as void;
      validators.checkForNumber(char, setHasOneNumber) as void;
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkRequirements(password);
    }, 300);
    return () => clearTimeout(timer);
  }, [password])

  return (
    <section className={styles.passwordValidators}>
      <ul>
        <li style={{ color: hasCorrectPassLength ? "green" : "red" }}>length greater than 19 and less than 51</li>
        <li style={{ color: hasOneSymbol ? "green" : "red" }}>contains 1 symbol (!,@,#,$,%)</li>
        <li style={{ color: hasOneLetter ? "green" : "red" }}>contains 1 letter</li>
        <li style={{ color: hasOneNumber ? "green" : "red" }}>contains 1 number</li>
      </ul>
    </section>
  )
}

export default ValidatePassword;