import React, { useState, useEffect } from "react";
import styles from 'src/styles/validateUsername.module.scss'

interface ValidateUsernameProps {
  username: string,
  hasCorrectUserLength: boolean,
  setHasCorrectUserLength: React.Dispatch<React.SetStateAction<boolean>>,
}

const ValidateUsername = ({
  username,
  setHasCorrectUserLength,
  hasCorrectUserLength
}: ValidateUsernameProps) => {

  const checkRequirements = (usernameInput: string): void => {
    if (usernameInput.length >= 10 && usernameInput.length <= 50) {
      setHasCorrectUserLength(true)
    } else {
      setHasCorrectUserLength(false);
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
        <li style={{ color: hasCorrectUserLength ? "green" : "red" }}>length greater than 9 and less than 51</li>
      </ul>
    </section>
  )
}

export default ValidateUsername;