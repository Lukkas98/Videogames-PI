import styles from "./Error.module.css";
import { NavLink } from "react-router-dom";

export default function Error({ nameError, errorPage }) {
  return (
    <>
      <NavLink to="/home" className={`${styles.link} ${styles.linkError}`}>
        BACK HOME
      </NavLink>
      <div className={styles.linkError}>
        {nameError ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>ERROR 404 NOT FOUND</p>
            <p className={styles.errorText}>
              There're no games with name {nameError}
            </p>
          </div>
        ) : (
          !errorPage && (
            <p className={styles.errorText}>ERROR 404 Games not Found</p>
          )
        )}
        {errorPage && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>ERROR 404</p>
            <p className={styles.errorText}>PAGE NOT FOUND</p>
          </div>
        )}
      </div>
    </>
  );
}
