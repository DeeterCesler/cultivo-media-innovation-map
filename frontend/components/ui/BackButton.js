import styled from 'styled-components';

import { colors, fontFamily } from './variables';

export default styled.button`
  background-color: ${({ inverse }) => inverse ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)'};
  border: none;
  border-radius: 4px;
  color: ${({ inverse }) => inverse ? 'rgba(255, 255, 255, .7)' : colors.gray};
  cursor: pointer;
  float: right;
  font-family: ${fontFamily};
  font-size: 16px;
  font-weight: 500;
  padding: 4px 8px;
`;
