import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
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
          <label> Username
            <input type="text"></input>
          </label>
          <label>Password
            <input type="password"></input>
          </label>
          <button className={styles.createButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
