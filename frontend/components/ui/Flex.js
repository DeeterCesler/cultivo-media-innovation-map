import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.center ? 'center' : 'flex-start'};
`;

export const Grow = styled.div`
  flex-grow: 1;
`;
