import { GoStar, GoRepo } from 'react-icons/go';

import { Container, Avatar, Username, Navigation, Button } from './styles';

const UserInfo = ({ user, handleStarredClick, handleRepoClick }) => {
  return (
    <Container>
      <Avatar src={user.avatar_url} alt="Avatar" />

      <Username>{user.login}</Username>

      <Navigation>
        <Button onClick={handleRepoClick}>
          <GoRepo />
        </Button>
        <Button onClick={handleStarredClick}>
          <GoStar />
        </Button>
      </Navigation>
    </Container>
  );
};

export default UserInfo;
