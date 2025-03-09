import { BrowserRouter } from 'react-router-dom';
import { Routing } from './Routing.js';

function App() {

  return <>
    <BrowserRouter>
      <Routing></Routing>
    </BrowserRouter>
  </>
}

export default App;