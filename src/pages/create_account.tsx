import Head from 'next/head';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === "username") {
      setUsername(evt.target.value);
    }
    if (evt.target.name === "password") {
      setPassword(evt.target.value);
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
      <article className={styles.article}>
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
              required>
            </input>
          </label>
          <label>Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evt) => handleChange(evt)}
              required>
            </input>
          </label>
          <button className={styles.createButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
