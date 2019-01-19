import blogPosts from './blog-posts.json';
import realProjects from './real-projects.json';
import sideProjects from './side-projects.json';

export function getBlogPosts(skip, limit) {
  const sortedPosts = blogPosts.sort((post1, post2) => {
    const time1 = new Date(post1.publishedOn).getTime();
    const time2 = new Date(post2.publishedOn).getTime();
    return time2 - time1;
  });

  const posts = sortedPosts.slice(skip, skip + limit);
  return {
    total: blogPosts.length,
    posts
  };
}

export function getRealProjects(category, skip, limit) {
  const filteredProjects = realProjects.filter(
    project => category === 'all' || project.categories.includes(category)
  );

  const sortedProjects = filteredProjects.sort((project1, project2) => {
    const time1 = new Date(project1.publishedOn).getTime();
    const time2 = new Date(project2.publishedOn).getTime();
    return time2 - time1;
  });

  const projects = sortedProjects.slice(skip, skip + limit);
  return {
    total: filteredProjects.length,
    projects
  };
}

export function getSideProjects(category, skip, limit) {
  const filteredProjects = sideProjects.filter(
    project => category === 'all' || project.categories.includes(category)
  );

  const sortedProjects = filteredProjects.sort((project1, project2) => {
    const time1 = new Date(project1.publishedOn).getTime();
    const time2 = new Date(project2.publishedOn).getTime();
    return time2 - time1;
  });

  const projects = sortedProjects.slice(skip, skip + limit);
  return {
    total: filteredProjects.length,
    projects
  };
}
