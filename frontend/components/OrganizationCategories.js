import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'react-grid-system';

import { colors } from './ui/variables';

import OrganizationCategoryShape from '../shapes/OrganizationCategory';

const StyledOrganizationCategories = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  h4 {
    color: ${colors.black};
    font-size: 20px;
    font-weight: 500;
    padding-top: 16px;
  }
`;

const StyledOrganizationCategoryItem = styled.div`
  cursor: pointer;
  padding: 16px 0;
  &:not(:last-child) {
    border-bottom: solid 1px #eee;
  }
  span {
    color: ${colors.gray};
    float: right;
  }
  h5 {
    color: ${colors.black};
    font-size: 16px;
    font-weight: 500;
  }
  p {
    color: ${colors.gray};
  }
`;

const StyledOrganizationCategoryImage = styled.div`
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 20px;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
  img {
    height: 20px;
  }
`;

const OrganizationCategories = ({ categories, selectCategory }) => (
  <StyledOrganizationCategories>
    <h4>
      Categories
    </h4>
    <br />
    {categories && categories.map(category => (
      <StyledOrganizationCategoryItem
        onClick={() => selectCategory(category)}
        key={category.identifier}
      >
        <Row>
          <Col xs={2}>
            <StyledOrganizationCategoryImage color={category.bgColor}>
              <img src={`static/category_icons/${category.image}`} alt={category.identifier} />
            </StyledOrganizationCategoryImage>
          </Col>
          <Col xs={10}>
            <span>
              &rsaquo;
            </span>
            <h5>
              {category.name}
            </h5>
            <p>
              {category.description}
            </p>
          </Col>
        </Row>
      </StyledOrganizationCategoryItem>
    ))
    }
  </StyledOrganizationCategories>
);

OrganizationCategories.propTypes = {
  categories: PropTypes.arrayOf(OrganizationCategoryShape).isRequired,
  selectCategory: PropTypes.func.isRequired,
};

export default OrganizationCategories;
