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

export function getRealProjects(skip, limit) {
  const sortedProjects = realProjects.sort((project1, project2) => {
    const time1 = new Date(project1.publishedOn).getTime();
    const time2 = new Date(project2.publishedOn).getTime();
    return time2 - time1;
  });

  const projects = sortedProjects.slice(skip, skip + limit);
  return {
    total: realProjects.length,
    projects
  };
}

export function getSideProjects(skip, limit) {
  const sortedProjects = sideProjects.sort((project1, project2) => {
    const time1 = new Date(project1.publishedOn).getTime();
    const time2 = new Date(project2.publishedOn).getTime();
    return time2 - time1;
  });

  const projects = sortedProjects.slice(skip, skip + limit);
  return {
    total: sideProjects.length,
    projects
  };
}
