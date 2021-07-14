import Head from 'next/head';
import Image from 'next/image';
import React, { FormEvent, MouseEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import ValidateUsername from '../../components/validateUsername';
import ValidatePassword from '../../components/validatePassword';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showUserReq, setShowUserReq] = useState<boolean>(false);
  const [showPassReq, setShowPassReq] = useState<boolean>(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'username') {
      setUsername(evt.target.value);
    }
    if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  const toggleReqsDisplay = (evt: React.MouseEvent<HTMLElement | HTMLInputElement>): void => {
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

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
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
        <form className={styles.form} onSubmit={handleSubmit}>
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
              <ValidateUsername username={username} />
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
              <ValidatePassword password={password}/>
            )}
          </label>
          <button className={styles.createButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
