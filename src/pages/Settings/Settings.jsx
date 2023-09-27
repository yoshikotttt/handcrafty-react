// import React from 'react'
import Logout from '../../components/other/Logout';
import styles from './Settings.module.scss';

const Settings = () => {
  return (
    <>
      <div className={styles["centeredContainer"]}>
        <Logout />
      </div>
    </>
  );
}

export default Settings