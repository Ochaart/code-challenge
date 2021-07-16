import Head from 'next/head';
import Image from 'next/image';
import React, { FormEvent, ChangeEvent, MouseEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import ValidateUsername from '../../components/validateUsername';
import ValidatePassword from '../../components/validatePassword';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showUserReq, setShowUserReq] = useState<boolean>(false);
  const [showPassReq, setShowPassReq] = useState<boolean>(false);
  const [hasCorrectUserLength, setHasCorrectUserLength] = useState<boolean>(false);
  const [hasCorrectPassLength, setHasCorrectPassLength] = useState<boolean>(false);
  const [hasOneSymbol, setHasOneSymbol] = useState<boolean>(false);
  const [hasOneLetter, setHasOneLetter] = useState<boolean>(false);
  const [hasOneNumber, setHasOneNumber] = useState<boolean>(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'username') {
      setUsername(evt.target.value);
    }
    if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  const toggleReqsDisplay = (evt: MouseEvent<HTMLElement | HTMLInputElement>): void => {
    evt.stopPropagation();
    if (evt.target.name === 'username') {
      setShowUserReq(true);
      setShowPassReq(false);
    } else if (evt.target.name === 'password') {
      setShowPassReq(true);
      setShowUserReq(false);
    } else {
      setShowUserReq(false);
      setShowPassReq(false);
    }
  }

  const checkIfExposedPass = async (password: string): Promise<boolean> => {
    try {
      const isExposed = await fetch('/api/password_exposed', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      const { result } = await isExposed.json();
      return result;
    } catch (errors) {
      console.log(errors);
    }
  }

  const createAccount = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      const { result } = await response.json()
      return result;
    } catch (errors) {
      console.log(errors);
    }
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    // if (hasCorrectUserLength && hasCorrectPassLength && hasOneLetter && hasOneSymbol && hasOneNumber) {
    if (!await checkIfExposedPass(password)) {
      if (await createAccount(username, password)) {
        console.log('succesfully created an account')
      } else {
        console.log('did not pass validation, please try again')
      }
    } else {
      console.log('password is not safe')
    }
    // }
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article
        className={styles.article}
        onClick={(evt) => toggleReqsDisplay(evt)}
      >
        <form
          className={styles.form}
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <div className={styles.logoContainer}>
            <Image
              src="/wealthfront.png"
              alt="Company Logo"
              height={45}
              width={50}
            />
          </div>
          <header>Create New Account</header>
          <label>Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={(evt) => handleChange(evt)}
              onClick={(evt) => toggleReqsDisplay(evt)}
              autoComplete="off"
              required
            >
            </input>
            {showUserReq && (
              <ValidateUsername
                username={username}
                hasCorrectUserLength={hasCorrectUserLength}
                setHasCorrectUserLength={setHasCorrectUserLength}
              />
            )}
          </label>
          <label>Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evt) => handleChange(evt)}
              required
            >
            </input>
            {showPassReq && (
              <ValidatePassword
                password={password}
                setHasCorrectPassLength={setHasCorrectPassLength}
                hasCorrectPassLength={hasCorrectPassLength}
                setHasOneSymbol={setHasOneSymbol}
                hasOneSymbol={hasOneSymbol}
                setHasOneLetter={setHasOneLetter}
                hasOneLetter={hasOneLetter}
                setHasOneNumber={setHasOneNumber}
                hasOneNumber={hasOneNumber}
              />
            )}
          </label>
          <button className={styles.createButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
