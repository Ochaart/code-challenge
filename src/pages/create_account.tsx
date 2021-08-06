import Head from 'next/head';
import Image from 'next/image';
import React, { FormEvent, ChangeEvent, MouseEvent, FocusEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import ValidateUsername from '../components/ValidateUsername';
import ValidatePassword from '../components/ValidatePassword';
import Modal from '../components/Modal';
import checkIfExposedPass from '../functions/checkIfExposedPass';
import createAccount from '../functions/createAccount';

export default function CreateAccount() : JSX.Element {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showUserReq, setShowUserReq] = useState<boolean>(false);
  const [showPassReq, setShowPassReq] = useState<boolean>(false);
  const [hasCorrectUserLength, setHasCorrectUserLength] = useState<boolean>(false);
  const [hasCorrectPassLength, setHasCorrectPassLength] = useState<boolean>(false);
  const [hasOneSymbol, setHasOneSymbol] = useState<boolean>(false);
  const [hasOneLetter, setHasOneLetter] = useState<boolean>(false);
  const [hasOneNumber, setHasOneNumber] = useState<boolean>(false);
  const [shakeMe, setShakeMe] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'username') {
      setUsername(evt.target.value);
    }
    if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  const toggleReqsDisplay = (evt: FocusEvent | MouseEvent<HTMLElement | HTMLInputElement>): void => {
    evt.stopPropagation();
    const { nodeName } = evt.target as HTMLLabelElement
    if (nodeName === 'LABEL') {
      return;
    }
    const target = evt.target as HTMLInputElement
    if (target.name === 'username') {
      setShowUserReq(true);
      setShowPassReq(false);
    } else if (target.name === 'password') {
      setShowPassReq(true);
      setShowUserReq(false);
    } else {
      setShowUserReq(false);
      setShowPassReq(false);
    }
  }

  async function handleSubmit(evt: FormEvent): Promise<void> {
    evt.preventDefault();
    // if (hasCorrectUserLength && hasCorrectPassLength && hasOneLetter && hasOneSymbol && hasOneNumber) {
    if (!(await checkIfExposedPass(password))) {
      if (await createAccount(username, password)) {
        setModalText('Successfully created an account.')
        setShowModal(true);
      } else {
        setShakeMe(true);
        setTimeout(() => {setShakeMe(false)}, 800)
        setModalText('Did not meet all requirements, please try again.')
        setShowModal(true);
      }
    } else {
      setShakeMe(true);
      setTimeout(() => {setShakeMe(false)}, 800)
      setModalText('Password is not safe, please try another.')
      setShowModal(true);
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
          id="form"
          className={`${styles.form} ${showPassReq || showUserReq ? (showPassReq ? styles.pass : styles.user) : styles.default}`}
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
              onFocus={(evt) => toggleReqsDisplay(evt)}
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
              onFocus={(evt) => toggleReqsDisplay(evt)}
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
          <button className={`${styles.createButton} ${shakeMe ? styles.shakeMe : null}`}>Create Account</button>
        </form>
        {showModal && <Modal
          setShowModal={setShowModal}
        >
          <span data-testid="result">{modalText}</span>
        </Modal>}
      </article>
    </>
  );
}
