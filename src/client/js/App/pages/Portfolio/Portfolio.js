import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import { withPagination } from 'ui/components/Pagination';
import DotsList from 'ui/components/DotsList';
import TextButton from 'ui/components/TextButton';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import LanguageContext from '../../i18n/language-context';
import { translate } from '../../i18n';
import { getRealProjects } from '../../api/client';

import Project from './components/Project';
import projectCategories from './project-categories';

const PortfolioPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Projects = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: ${space.x4};
  flex-grow: 1;

  ${mediaQueries.md(css`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `)};
`;

const ProjectWrapper = styled.div`
  margin: ${space.x4} 0 ${space.x2};

  ${mediaQueries.md(css`
    width: 49%;
    margin-bottom: 0;
  `)}

  ${mediaQueries.xl(css`
    width: 33%;
  `)}
`;

const Category = styled(TextButton)`
  font-family: ${fonts.AndaleMono};
  color: ${({ isActive, theme }) => (isActive ? theme.primaryColor : null)};
`;

const ITEMS_PER_PAGE = 6;

class Portfolio extends Component {
  state = {
    projects: [],
    totalProjects: 0,
    category: 'all'
  };

  componentDidMount() {
    this.requestProjects();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      this.requestProjects();
    }
  }

  handleSelectCategory = category => {
    this.setState({ category });
  };

  requestProjects() {
    const { page } = this.props;

    const { projects, total } = getRealProjects(
      (page - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE
    );
    this.setState({ projects, totalProjects: total });
  }

  render() {
    const { projects, totalProjects, category } = this.state;
    const { renderPagination } = this.props;
    const { language } = this.context;

    return (
      <PortfolioPage>
        <PageTitle>{translate('portfolio_header_text')}</PageTitle>
        <DotsList
          items={projectCategories}
          renderItem={item => (
            <Category
              isActive={category === item}
              onClick={() => this.handleSelectCategory(item)}
            >
              {item.toUpperCase()}
            </Category>
          )}
        />
        <Projects>
          {projects.map(({ id, name, categories, image, technologies }) => (
            <ProjectWrapper key={id[language]}>
              <Project
                name={name[language]}
                categories={categories}
                technologies={technologies.map(
                  technology => technology[language]
                )}
                image={image}
                id={id[language]}
              />
            </ProjectWrapper>
          ))}
        </Projects>
        {renderPagination(totalProjects, (currentPage, totalPages) =>
          translate('portfolio_pagination_text', currentPage, totalPages)
        )}
      </PortfolioPage>
    );
  }
}

Portfolio.contextType = LanguageContext;

Portfolio.propTypes = {
  page: PropTypes.number.isRequired,
  renderPagination: PropTypes.func.isRequired
};

export default withPagination(Portfolio, ITEMS_PER_PAGE);
