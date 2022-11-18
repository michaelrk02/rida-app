import {
  Component
} from 'react';

import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';

import homeRoutes from './routes/home';
import hIndexRoutes from './routes/h-index';
import adminRoutes  from './routes/admin';

class App extends Component {

  constructor(props) {
    super(props);

    this.router = createBrowserRouter([
      homeRoutes,
      hIndexRoutes,
      adminRoutes
    ]);
  }

  render() {
    return (
      <RouterProvider router={this.router} />
    );
  }

  onModalOpen() {
    this.setState({isModalOpen: true});
  }

  onModalClose() {
    this.setState({isModalOpen: false});
  }

}

export default App;
