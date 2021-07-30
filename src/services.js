const DEFAULT_BRANCH = 'new-words';
const GIT_URL = 'https://api.github.com/repos/helloitsjoe/flashcards';

export const ENABLE_NEW_WORDS = true;

// References
// https://gist.github.com/harlantwood/2935203
// https://mdswanson.com/blog/2011/07/23/digging-around-the-github-api-take-2.html
// https://docs.github.com/en/rest/reference/git#trees
// https://docs.github.com/en/rest/reference/pulls#create-a-pull-request

const myFetch = (...args) => {
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(
            `${res.status}! ${err.message}. ${err.documentation_url}`
          );
        });
      }
      return res.json();
    })
    .then(res => {
      console.log(args[0]);
      console.log(res);
      return res;
    });
};

export const addWord = async ({ key, value }, token) => {
  const headers = {
    'content-type': 'application/json',
    accept: 'application/vnd.github.v3+json',
    Authorization: `token ${token}`,
  };

  const getGit = endpoint => {
    return myFetch(`${GIT_URL}/git/${endpoint}`, { headers });
  };

  // Route is not ideal but 'pulls' is the only endpoint that isn't at /git
  const postGit = (endpoint, options, route = '/git') => {
    return myFetch(`${GIT_URL}${route}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(options.body),
      headers,
    });
  };

  const getHead = () => {
    return getGit(`refs/heads/${DEFAULT_BRANCH}`).then(
      branch => branch.object.sha
    );
  };

  const getLastTreeSha = mainHeadSha => {
    return getGit(`commits/${mainHeadSha}`).then(
      lastCommit => lastCommit.tree.sha
    );
  };

  const getFileSha = treeSha => {
    // TODO: Is there a simpler way to get the file sha?
    return getGit(`trees/${treeSha}`).then(({ tree }) => {
      const words = tree.find(({ path }) => path === 'words.json');
      const src = tree.find(({ path }) => path === 'src' || path === 'data');

      if (words) {
        return words.sha;
      }

      if (src) {
        return getFileSha(src.sha);
      }
    });
  };

  const getFileContents = fileSha => {
    return getGit(`blobs/${fileSha}`).then(data => data.content);
  };

  const updateFile = (content, { key, value } = {}) => {
    const json = JSON.parse(content);
    if (!key || !value || key in json) {
      // TODO: Do this validation before any fetching
      throw new Error(`Key ${key} already exists`);
    }

    const newJson = { ...json, ...{ key, value } };

    console.log('New json:', newJson);

    return JSON.stringify(newJson, null, 2);
  };

  const createTreeObject = (lastTreeSha, content) => {
    return postGit(`trees`, {
      body: {
        base_tree: lastTreeSha,
        tree: [
          {
            path: 'src/data/words.json',
            mode: '100644',
            content,
          },
        ],
      },
    });
  };

  const createCommit = (latestCommitSha, newTree, newWord) => {
    return postGit('commits', {
      body: {
        message: `Adding new word: ${newWord}`,
        parents: [latestCommitSha],
        tree: newTree,
      },
    });
  };

  // const createBranch = (sha, branch) => {
  //   return postGit('refs', {
  //     body: {
  //       ref: `refs/heads/${branch}`,
  //       sha,
  //     },
  //   });
  // };

  // const createPullRequest = branch => {
  //   return postGit(
  //     'pulls',
  //     {
  //       body: {
  //         title: 'Add a word',
  //         head: branch,
  //         base: DEFAULT_BRANCH,
  //         maintainer_can_modify: true,
  //       },
  //     },
  //     ''
  //   );
  // };

  const latestCommitSha = await getHead();

  // Option 1: long-lived branch that `main` updates from
  const latestTreeSha = await getLastTreeSha(latestCommitSha);
  const fileSha = await getFileSha(latestTreeSha);
  const fileContents = await getFileContents(fileSha);

  const updatedFile = updateFile(atob(fileContents));

  const created = await createTreeObject(latestTreeSha, updatedFile);
  const commit = await createCommit(latestCommitSha, created.sha, key);

  // Option 2 (includes lines above): short-lived branches that make PRs to main

  // const branch = new Date()
  //   .toISOString()
  //   .slice(0, 16)
  //   .replace('T', '_')
  //   .replace(':', '-');

  // const ref = await createBranch(commit.sha, branch);
  // const res = await createPullRequest(branch);
};
