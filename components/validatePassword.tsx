import React, { useEffect } from "react";
import styles from 'src/styles/ValidatePassword.module.scss'

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
}: ValidatePasswordProps) => {
  const checkLength = (passInput: string): void => {
    if (passInput.length >= 20 && passInput.length <= 50) {
      setHasCorrectPassLength(true);
    } else {
      setHasCorrectPassLength(false)
    }
  }

  const checkForSymbol = (char: string) : void => {
    if (["!", "@", "#", "$", "%"].includes(char)) {
      setHasOneSymbol(true)
    }
  }

  const checkForLetter = (char: string): void => {
    if (char.toLowerCase() != char.toUpperCase()) {
      setHasOneLetter(true);
    }
  }

  const checkForNumber = (char: string): void => {
    if (!isNaN(parseFloat(char)) && isFinite(Number(char))) {
      setHasOneNumber(true);
    }
  }

  const checkRequirements = (passInput: string): void => {
    setHasOneSymbol(false);
    setHasOneLetter(false);
    setHasOneNumber(false);
    checkLength(passInput);
    for (const char of passInput) {
      checkForSymbol(char);
      checkForLetter(char);
      checkForNumber(char)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkRequirements(password);
    }, 500);
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