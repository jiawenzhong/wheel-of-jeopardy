import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
  },
}));

const App = ({children}) => {
  const styles = useStyles();
  
  return (
    <div className={clsx("App", styles.root)}>
      {children}
    </div>
  );
}

export default App;
