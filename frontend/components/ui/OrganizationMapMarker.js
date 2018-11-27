import styled from 'styled-components';

/**
 * OrganizationMapMarker
 *
 * styled component
 *
 * A map marker to be used on the mapbox map.
 */
const OrganizationMapMarker = styled.div`
  align-items: center;
  background-color: ${({ color }) => color};
  border: solid 4px #fff;
  border-radius: 100px;
  box-shadow: 0 5px 20px rgba(0,0, 0, .1);
  color: #fff;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  width: 40px;
  img {
    height: 20px;
  }
`;

export default OrganizationMapMarker;
