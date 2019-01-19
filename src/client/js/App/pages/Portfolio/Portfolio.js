import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import { withPagination } from 'ui/components/Pagination';
import DotsList, { Separator } from 'ui/components/DotsList';
import TextButton from 'ui/components/TextButton';
import ButtonGroup from 'ui/components/ButtonGroup';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import LanguageContext from '../../i18n/language-context';
import { translate } from '../../i18n';
import { getRealProjects, getSideProjects } from '../../api/client';

import Project from './components/Project';
import projectCategories from './project-categories';
import projectTypes from './project-types';

const PortfolioPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const ProjectTypesList = styled(ButtonGroup)`
  align-self: center;
  margin-top: ${space.x4};

  ${mediaQueries.lg(css`
    margin-top: ${space.x1};
    position: absolute;
    right: ${space.x5};
    top: ${space.x4};
  `)}
`;

const Projects = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: ${space.x4};
  flex-grow: 1;

  ${mediaQueries.md(css`
    flex-direction: row;
    flex-wrap: wrap;
  `)};
`;

const ProjectWrapper = styled.div`
  margin-top: ${space.x2};

  ${mediaQueries.md(css`
    padding: 0 ${space.x1};
    width: 50%;
    margin-top: ${space.x4};
  `)}

  ${mediaQueries.xl(css`
    padding: 0 ${space.x05};
    width: 33.333%;
  `)}
`;

const CategoriesList = styled(DotsList)`
  margin: ${space.x4} 0 ${space.x1};
  align-self: center;

  ${mediaQueries.md(css`
    margin-bottom: 0;

    ${Separator} {
      margin: 0 ${space.x2};
    }
  `)}
`;

const Category = styled(TextButton)`
  font-family: ${fonts.AndaleMono};
  color: ${({ isActive, theme }) => (isActive ? theme.primaryColor : null)};
  font-size: ${fonts.sizes.s};
  text-transform: uppercase;

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.m};
  `)}
`;

const ITEMS_PER_PAGE = 6;

class Portfolio extends Component {
  state = {
    projects: [],
    totalProjects: 0,
    type: 'real',
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
    this.setState({ category }, this.requestProjects);
  };

  handleActiveProjectTypeChange = type => {
    this.setState({ type }, this.requestProjects);
  };

  requestProjects() {
    const { page } = this.props;
    const { category, type } = this.state;

    const getProjectsFn = type === 'real' ? getRealProjects : getSideProjects;

    const { projects, total } = getProjectsFn(
      category,
      (page - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE
    );
    this.setState({ projects, totalProjects: total });
  }

  render() {
    const { projects, totalProjects, category, type: projectType } = this.state;
    const { renderPagination } = this.props;
    const { language } = this.context;
    const projectTypesButtons = projectTypes.map(type => ({
      name: type,
      text: translate(`portfolio_project_types_${type}`)
    }));

    return (
      <PortfolioPage>
        <PageTitle>{translate('portfolio_header_text')}</PageTitle>
        <ProjectTypesList
          activeButton={projectType}
          buttons={projectTypesButtons}
          onActiveChange={this.handleActiveProjectTypeChange}
        />
        <CategoriesList
          items={projectCategories}
          renderItem={item => (
            <Category
              isActive={category === item}
              onClick={() => this.handleSelectCategory(item)}
            >
              {translate(`portfolio_categories_${item}`)}
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
