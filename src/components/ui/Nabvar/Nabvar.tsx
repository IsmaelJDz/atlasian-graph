import Image from "next/image";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.img}>
        <Image src="/images/logo.png" width={145} height={53} alt="logo" />
      </div>
    </div>
  );
};
