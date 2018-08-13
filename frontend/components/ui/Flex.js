import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: ${props => props.center ? 'center' : 'flex-start'};
`;
