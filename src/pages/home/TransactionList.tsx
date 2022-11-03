import styles from "./Home.module.css";

export default function TransactionList({ transactions }: any) {
  const listItems = transactions.map((transaction: any) => (
    <li key={transaction.id}>
      <p className={styles.name}>{transaction.name}</p>
      <p className={styles.amount}>${transaction.amount}</p>
    </li>
  ));

  return <ul className={styles.transactions}>{listItems}</ul>;
}
