import { Link } from 'react-router-dom';

//* Подключение нужных ассетов
import logotype from '../../../assets/static/logotype.png';

//* Подключение стилей
import styles from './logotype.module.scss';

export const Logotype = () => {
  return (
    <Link to="/" className={styles.logotype}>
      <img src={logotype} alt="" />
      <span>Petcase</span>
    </Link>
  )
}
