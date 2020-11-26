import React from 'react';
import * as styles from './index.less';

/**
 * 属性定义
 */
interface Props {
  /** 文字大小 */
  size: number;
}
const App: React.FC<Props> = ({ size = 50 }) => {
  return (
    <div className={styles.bg} style={{ fontSize: `${size}px` }}>
      <span role="img" aria-label="w">
        🦟
      </span>
    </div>
  );
};
export default App;
