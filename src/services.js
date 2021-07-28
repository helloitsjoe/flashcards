const DEFAULT_BRANCH = 'git-api';
const GIT_URL = 'https://api.github.com/repos/helloitsjoe/flashcards/git';

const myFetch = (...args) => {
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching:', res.status);
      }
      // return res.text();
      return res.json();
    })
    .then(res => {
      console.log(res);
      return res;
    });
};

const getGit = (endpoint, options) => {
  return myFetch(`${GIT_URL}/${endpoint}`, options);
};

const getMainHead = () => {
  return getGit(`refs/heads/${DEFAULT_BRANCH}`).then(
    branch => branch.object.sha
  );
};

const getLastCommit = mainHeadSha => {
  return getGit(`commits/${mainHeadSha}`).then(
    lastCommit => lastCommit.tree.sha
  );
};

const getTree = treeSha => {
  return getGit(`trees/${treeSha}`).then(({ tree }) => {
    const words = tree.find(({ path }) => path === 'test.json');
    if (words) {
      return words.sha;
    }

    const src = tree.find(({ path }) => path === 'src' || path === 'data');

    if (src) {
      return getTree(src.sha);
    }
  });
};

const getBlob = fileSha => {
  return getGit(`blobs/${fileSha}`).then(data => data.content);
};

const updateFile = blob => {
  const contents = JSON.parse(atob(blob));
  contents.added = { foo: 'bar' };
  return btoa(JSON.stringify(contents));
};

const createTreeObject = (lastTreeSha, content) => {
  return getGit(`trees/${lastTreeSha}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/vnd.github.v3+json',
    },
    body: {
      parents: [lastTreeSha],
      message: 'Adding content',
      content: [
        {
          path: '/src/data/test.json',
          // mode: 'add' for a new file
          mode: 'edit',
          data: updateFile(content),
        },
      ],
    },
  });
};

const createCommit = () => {};

// const createPullRequest = () => {
//   return myFetch('https://api.github.com/repos/helloitsjoe/flashcards/pulls', {
//   });
// };

export const addCategory = name => {
  return getMainHead()
    .then(getLastCommit)
    .then(getTree)
    .then(getBlob)
    .then(console.log);
};
