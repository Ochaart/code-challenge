import React, { useState, useEffect } from "react";
import styles from 'src/styles/validateUsername.module.scss'

interface ValidateUsernameProps {
  username: string;
}

const ValidateUsername = ({ username } : ValidateUsernameProps) => {
  const [hasCorrectLength, setHasCorrectLength] = useState<boolean>(false);

  const checkRequirements = ( usernameInput: string ) : void => {
    if (usernameInput.length >= 10 && usernameInput.length <= 50) {
      setHasCorrectLength(true)
    } else {
      setHasCorrectLength(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkRequirements(username);
    }, 500);
    return () => clearTimeout(timer);
  }, [username])

  return (
    <section className={styles.usernameValidators}>
      <ul>
        <li style={{ color: hasCorrectLength ? "green" : "red"}}>must be greater than 10 and less than 50</li>
      </ul>
    </section>
  )
}

export default ValidateUsername;