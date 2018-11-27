import styled from 'styled-components';
import { colors } from './variables';

export default styled.div`
  align-items: center;
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  height: 60px;
  padding: 0 40px;
  img {
    height: 24px;
    margin: -4px 8px 0 0;
  }
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;
