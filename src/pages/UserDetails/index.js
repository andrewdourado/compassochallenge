import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '~/services/api';

import DefaultLayout from '../_layouts/default';

import Spinner from '~/components/Spinner';

import RepoList from './RepoList';
import StarredList from './StarredList';

import { Container } from './styles';
import UserInfo from './UserInfo';

const UserDetails = () => {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isShowRepos, setIsShowRepos] = useState(true);

  useEffect(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/users/${username}`);

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

  const handleStarredClick = useCallback(() => {
    setIsShowRepos(false);
  }, []);

  const handleRepoClick = useCallback(() => {
    setIsShowRepos(true);
  }, []);

  return (
    <DefaultLayout>
      <Container>
        {loading && <Spinner />}

        {!loading && showError && 'Nenhum usuário encontrado'}

        {!loading && JSON.stringify(user) !== '{}' && (
          <>
            <UserInfo
              user={user}
              handleStarredClick={handleStarredClick}
              handleRepoClick={handleRepoClick}
            />

            {isShowRepos && <RepoList username={user.login} />}

            {!isShowRepos && <StarredList username={user.login} />}
          </>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default UserDetails;
