import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions }: any) {
  const { deleteDocument } = useFirestore("transactions");

  const listItems = transactions.map((transaction: any) => (
    <li key={transaction.id}>
      <p className={styles.name}>{transaction.name}</p>
      <p className={styles.amount}>${transaction.amount}</p>
      <button onClick={() => deleteDocument(transaction.id)}>x</button>
    </li>
  ));

  return <ul className={styles.transactions}>{listItems}</ul>;
}
