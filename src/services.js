const DEFAULT_BRANCH = 'main';
const GIT_URL = 'https://api.github.com/repos/helloitsjoe/flashcards/git/';

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

// TODO: Do this on a branch
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

const getBlob = lastCommitSha => {
  return getGit(`blobs/${lastCommitSha}`).then(data => atob(data.content));
};

const createTreeObject = lastTreeSha => {
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
          data: 'edited version of file',
        },
      ],
    },
  }).then(lastCommit => lastCommit.tree.sha);
};

const createCommit = () => {};

// const createPullRequest = () => {
//   return myFetch('https://api.github.com/repos/helloitsjoe/flashcards/pulls', {
//   });
// };

export const addCategory = name => {
  return getLastCommit();
};
