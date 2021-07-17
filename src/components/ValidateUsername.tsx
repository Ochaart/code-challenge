import React, { useEffect } from "react";
import styles from 'src/styles/ValidateUsername.module.scss'
import validators from '../functions/validators';

interface ValidateUsernameProps {
  username: string,
  hasCorrectUserLength: boolean,
  setHasCorrectUserLength: React.Dispatch<React.SetStateAction<boolean>>,
}

const ValidateUsername = ({
  username,
  setHasCorrectUserLength,
  hasCorrectUserLength
}: ValidateUsernameProps) : JSX.Element => {

  const checkRequirements = (usernameInput: string): void => {
    validators.checkUserLength(usernameInput, setHasCorrectUserLength) as void;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkRequirements(username);
    }, 300);
    return () => clearTimeout(timer);
  }, [username])

  return (
    <section className={styles.usernameValidators}>
      <ul>
        <li style={{ color: hasCorrectUserLength ? "green" : "red" }}>length greater than 9 and less than 51</li>
      </ul>
    </section>
  )
}

export default ValidateUsername;