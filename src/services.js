const DEFAULT_BRANCH = 'new-words';
const GIT_URL = 'https://api.github.com/repos/helloitsjoe/flashcards';

export const ENABLE_NEW_WORDS = true;

// References
// https://gist.github.com/harlantwood/2935203
// https://mdswanson.com/blog/2011/07/23/digging-around-the-github-api-take-2.html
// https://docs.github.com/en/rest/reference/git#trees
// https://docs.github.com/en/rest/reference/pulls#create-a-pull-request

const myFetch = (url, options) => {
  return fetch(url, options)
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(
            `${res.status}! ${err.message}. ${err.documentation_url}`
          );
        });
      }
      if (options.headers.Accept.includes('v3.raw')) {
        return res.text();
      }
      return res.json();
    })
    .then(res => {
      console.log(url);
      console.log(res);
      return res;
    });
};

export const addWord = async ({ key, value }, words, token) => {
  sessionStorage.setItem('flashcards-token', token);

  const headers = {
    'Content-Type': 'text/html',
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${token}`,
  };

  const getGit = (endpoint, options = {}, route = '/git') => {
    return myFetch(`${GIT_URL}${route}/${endpoint}`, {
      headers: { ...headers, ...options.headers },
    });
  };

  // Route is not ideal but 'pulls' is the only endpoint that isn't at /git
  const postGit = (endpoint, options, route = '/git') => {
    return myFetch(`${GIT_URL}${route}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(options.body),
      headers: { ...headers, ...options.headers },
    });
  };

  const patchGit = (endpoint, options, route = '/git') => {
    return myFetch(`${GIT_URL}${route}/${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(options.body),
      headers: { ...headers, ...options.headers },
    });
  };

  const putGit = (endpoint, options, route = '/git') => {
    return myFetch(`${GIT_URL}${route}/${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(options.body),
      headers: { ...headers, ...options.headers },
    });
  };

  const getHead = () =>
    getGit(`refs/heads/${DEFAULT_BRANCH}`).then(branch => branch.object.sha);

  const getLastTreeSha = mainHeadSha =>
    getGit(`commits/${mainHeadSha}`).then(lastCommit => lastCommit.tree.sha);

  // // Unused because getFileContents is simpler, but keeping for reference
  // const getFileSha = treeSha => {
  //   return getGit(`trees/${treeSha}`).then(({ tree }) => {
  //     const words = tree.find(({ path }) => path === 'words.json');
  //     const src = tree.find(({ path }) => path === 'src' || path === 'data');

  //     if (words) {
  //       return words.sha;
  //     }

  //     if (src) {
  //       return getFileSha(src.sha);
  //     }
  //   });
  // };

  // const getBlob = fileSha => {
  //   return getGit(`blobs/${fileSha}`, {
  //     headers: { Accept: 'application/vnd.github.v3.raw' },
  //   }).then(data => data.content);
  // };

  // Unneeded if we pass `words` into `addWord`
  // const getFileContents = () =>
  //   getGit(
  //     `contents/src/data/words.json`,
  //     {
  //       headers: {
  //         // NOTE: raw content header only works on main branch, ?ref=branch only returns json
  //         Accept: 'application/vnd.github.v3.raw',
  //       },
  //     },
  //     ''
  //   );

  const updateContent = (content, { key, value } = {}) => {
    // const json = JSON.parse(content);
    console.log('content', content);
    if (!key || !value || key in content) {
      throw new Error(`Key ${key} already exists`);
    }

    const newJson = { ...content, [key]: value };

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

  const createCommit = (latestCommitSha, newTree, key) => {
    return postGit('commits', {
      body: {
        message: `Adding new word: ${key}`,
        parents: [latestCommitSha],
        tree: newTree,
      },
    });
  };

  const updateBranch = (sha, branch) => {
    return patchGit(`refs/heads/${branch}`, {
      body: { sha },
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

  // Option 1: long-lived branch that `main` updates from
  const latestCommitSha = await getHead();
  const latestTreeSha = await getLastTreeSha(latestCommitSha);
  // const fileSha = await getFileSha(latestTreeSha);
  // const fileContents = await getBlob(fileSha);
  // const fileContents = await getFileContents();

  const updatedContent = updateContent(words, {
    key,
    value,
  });

  const created = await createTreeObject(latestTreeSha, updatedContent);
  const commit = await createCommit(latestCommitSha, created.sha, key);
  const ref = await updateBranch(commit.sha, DEFAULT_BRANCH);

  return JSON.parse(updatedContent);

  // Option 2 (includes lines above): short-lived branches that make PRs to main

  // const branch = new Date()
  //   .toISOString()
  //   .slice(0, 16)
  //   .replace('T', '_')
  //   .replace(':', '-');

  // const ref = await createBranch(commit.sha, branch);
  // const res = await createPullRequest(branch);
};
