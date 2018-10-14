import styled from 'styled-components';
import { colors } from './variables';

export default styled.div`
  align-items: center;
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  height: 60px;
  padding: 0 40px;
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;
