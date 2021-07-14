import React, { useState, useEffect } from "react";
import styles from 'src/styles/validateUsername.module.scss'

interface ValidateUsernameProps {
  username: string;
}

const ValidateUsername = ({ username } : ValidateUsernameProps) => {
  const checkRequirements = ( usernameInput: string ) : boolean => {
    if (usernameInput.length >= 10 && usernameInput.length <= 50) {
      return true;
    }
    return false;
  }
  const [hasCorrectLength, setHasCorrectLength] = useState<boolean>(false);

  useEffect(() => {
    if (checkRequirements(username)) {
      setHasCorrectLength(true);
    } else {
      setHasCorrectLength(false);
    }
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