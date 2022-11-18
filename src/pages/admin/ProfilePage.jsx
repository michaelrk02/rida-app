import {Component} from 'react'

import {
  Navigate
} from 'react-router-dom';

import {UserContext} from '../../providers/UserProvider';

import {
  Text
} from '@chakra-ui/react';

import DataSource from '../../components/DataSource';

class ProfilePage extends Component {

  render() {
    return (
        <UserContext.Consumer>
          {
            user => !user.check() ?
            (<Navigate to="/admin/login" />) :
            (
              <DataSource
                endpoint="/peneliti"
                columns={[
                  {id: 'nidn', title: 'NIDN', sort: 'peneliti.nidn'},
                  {id: 'nama', title: 'Nama', sort: 'peneliti.nama'},
                  {id: 'jenis_kelamin', title: 'Jenis Kelamin', sort: false},
                  {id: 'fakultas_nama', title: 'Fakultas', sort: 'Fakultas.nama'},
                  {id: 'diciptakan_oleh_nama', title: 'Diciptakan Oleh', sort: 'DiciptakanOleh.nama'}
                ]}
              />
            )
          }
        </UserContext.Consumer>
    );
  }

}

export default ProfilePage;
