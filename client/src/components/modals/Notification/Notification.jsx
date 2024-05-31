import { Close } from '../../common/Close/Close';
import styles from './notification.module.scss';

export const Notification = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.notification_wrapper}>
        <div className={styles.notification_header}>
          <span className={styles.notification_title}>Последние уведомления</span>
          <Close />
        </div>
        <div className={styles.notification_body}>
            {/* <div className={`${styles.notification_nothing} ${styles.nothing}`}>
                <span className={styles.nothing_title}>Уведомления отсутствуют</span>
            </div> */}
            <div className={`${styles.notification_list} ${styles.list}`}>
                <div className={`${styles.list_notify} ${styles.notify}`}>
                    <span className={styles.notify_description}></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
