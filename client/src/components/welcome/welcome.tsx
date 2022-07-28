import styles from './welcome.module.scss';

function Welcome() {
  return (
    <div className={styles.title}>
      <h1>👋 Welcome to Elections DAPP!</h1>
      <p>
        This application deployed on the Ethereum network and uses it's power to implement a powerful and secure
        elections mechanism. Let's get started!
      </p>
    </div>
  );
}

export default Welcome;
