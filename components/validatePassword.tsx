import React, { useState, useEffect } from "react";
import styles from 'src/styles/validatePassword.module.scss'

interface ValidatePasswordProps {
  password: string;
}

const ValidatePassword = ({ password } : ValidatePasswordProps) => {
  const [hasCorrectLength, setHasCorrectLength] = useState<boolean>(false);
  const [hasOneSymbol, setHasOneSymbol] = useState<boolean>(false);
  const [hasOneLetter, setHasOneLetter] = useState<boolean>(false);
  const [hasOneNumber, setHasOneNumber] = useState<boolean>(false);

  const checkLength = (passInput: string) : void => {
    if (passInput.length >= 20 && passInput.length <= 50) {
      setHasCorrectLength(true);
    } else {
      setHasCorrectLength(false)
    }
  }

  const checkForSymbol = (char: string) => {
    if (["!", "@", "#", "$", "%"].includes(char)) {
      setHasOneSymbol(true)
    }
  }

  const checkForLetter = (char: string) : void => {
    if (char.toLowerCase() != char.toUpperCase()) {
      setHasOneLetter(true);
    }
  }

  const checkForNumber = (char: string) : void => {
    if (!isNaN(parseFloat(char)) && isFinite(Number(char))) {
      setHasOneNumber(true);
    }
  }

  const checkRequirements = ( passInput: string ) : void => {
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
        <li style={{ color: hasCorrectLength ? "green" : "red"}}>must be greater than 20 and less than 50</li>
        <li style={{ color: hasOneSymbol ? "green" : "red"}}>contains 1 symbol (!,@,#,$,%)</li>
        <li style={{ color: hasOneLetter ? "green" : "red"}}>contains 1 letter</li>
        <li style={{ color: hasOneNumber ? "green" : "red"}}>contains 1 number</li>
      </ul>
    </section>
  )
}

export default ValidatePassword;