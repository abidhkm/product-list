import { Container, CssBaseline } from '@mui/material';
import { Products } from './pages/products/Products';
import { Fragment } from 'react/jsx-runtime';

function App() {
  return (<Fragment>
    <CssBaseline />
    <Container sx={{padding: 4}} maxWidth="lg">
      <Products />
    </Container>

  </Fragment>
  );
}

export default App;
