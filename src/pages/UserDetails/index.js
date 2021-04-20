import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoStar, GoRepo } from 'react-icons/go';

import api from '~/services/api';

import DefaultLayout from '../_layouts/default';

import Spinner from '~/components/Spinner';

import { Container, Avatar, Username, Navigation, Button } from './styles';

const UserDetails = () => {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);

      const request = `${process.env.REACT_APP_GITHUB_API_URL}/users/${username}`;
      const { data } = await api.get(request.trim());

      setUser(data);
    } catch (err) {
      if (err.response.status == 404) {
        setShowError(true);
        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DefaultLayout>
      <Container>
        {loading && <Spinner />}

        {!loading && showError && 'Nenhum usuário encontrado'}

        {!loading && JSON.stringify(user) !== '{}' && (
          <>
            <Avatar src={user.avatar_url} alt="Avatar" />

            <Username>{user.login}</Username>

            <Navigation>
              <Button>
                <GoStar />
              </Button>
              <Button>
                <GoRepo />
              </Button>
            </Navigation>
          </>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default UserDetails;
