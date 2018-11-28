import styled from 'styled-components';
import { colors } from './variables';

export const RealignMapMarkerContainer = styled.div`
  position: absolute;
  text-align: center;
  top: 20px;
  width: 100%;
  z-index: 9999999;
`;

export const RealignMapMarker = styled.a`
  color: ${colors.blue};
  font-weight: 500;
`;
