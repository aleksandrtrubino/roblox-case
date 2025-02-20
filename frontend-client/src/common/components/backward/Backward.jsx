import { Link } from 'react-router-dom';
import styles from './backward.module.scss';

export const Backward = () => {
  return (
    <Link to='/' className={styles.backward}>
      <svg
        className={styles.backward_icon}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96.154 96.154">
        <g>
          <path
            d="M75.183,0.561L17.578,46.513c-0.951,0.76-0.951,2.367,0,3.126l57.608,45.955c0.689,0.547,1.717,0.709,2.61,0.414
		c0.186-0.061,0.33-0.129,0.436-0.186c0.65-0.351,1.057-1.025,1.057-1.765V2.093c0-0.736-0.405-1.414-1.057-1.762
		c-0.108-0.059-0.253-0.127-0.426-0.184C76.903-0.15,75.874,0.011,75.183,0.561z"
          />
        </g>
      </svg>
      <span className={styles.backward_title}>Назад</span>
    </Link>
  );
};
