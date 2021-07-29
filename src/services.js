const DEFAULT_BRANCH = 'git-api';
const GIT_URL = 'https://api.github.com/repos/helloitsjoe/flashcards';

// https://gist.github.com/harlantwood/2935203
// https://mdswanson.com/blog/2011/07/23/digging-around-the-github-api-take-2.html
// https://docs.github.com/en/rest/reference/git#trees
// https://docs.github.com/en/rest/reference/pulls#create-a-pull-request

const headers = {
  'content-type': 'application/json',
  accept: 'application/vnd.github.v3+json',
  // Authorization: `token ${process.env.TOKEN}`,
};

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
      console.log(res);
      return res;
    });
};

const getGit = (endpoint, options) => {
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

const getMainHead = () => {
  return getGit(`refs/heads/${DEFAULT_BRANCH}`).then(
    branch => branch.object.sha
  );
};

const getLastTreeSha = mainHeadSha => {
  return getGit(`commits/${mainHeadSha}`).then(
    lastCommit => lastCommit.tree.sha
  );
};

const getBlobSha = treeSha => {
  // TODO: Is there a simpler way to get the file sha?
  return getGit(`trees/${treeSha}`).then(({ tree }) => {
    const words = tree.find(({ path }) => path === 'test.json');
    const src = tree.find(({ path }) => path === 'src' || path === 'data');

    if (words) {
      return words.sha;
    }

    if (src) {
      return getBlobSha(src.sha);
    }
  });
};

const getBlob = fileSha => {
  return getGit(`blobs/${fileSha}`).then(data => data.content);
};

const updateFile = blob => {
  const contents = JSON.parse(atob(blob));
  contents.added = { foo: 'bar' };
  return JSON.stringify(contents, null, 2);
};

const createTreeObject = (lastTreeSha, content) => {
  return postGit(`trees`, {
    body: {
      base_tree: lastTreeSha,
      tree: [
        {
          path: 'src/data/test.json',
          mode: '100644',
          content,
        },
      ],
    },
  });
};

const createCommit = (latestCommitSha, newTree) => {
  return postGit('commits', {
    body: {
      message: 'Adding a word',
      parents: [latestCommitSha],
      tree: newTree,
    },
  });
};

const createBranch = (sha, branch) => {
  return postGit('refs', {
    body: {
      ref: `refs/heads/${branch}`,
      sha,
    },
  });
};

const createPullRequest = branch => {
  return postGit(
    'pulls',
    {
      body: {
        title: 'Add a word',
        head: branch,
        base: DEFAULT_BRANCH,
        maintainer_can_modify: true,
      },
    },
    ''
  );
};

export const addCategory = async name => {
  // let latestTreeSha = '3f4b52745629cb43fe39d76bfe6a7b47348ed8cc';
  // const blob = 'ewogICJmaXJzdCI6ICJjb250ZW50Igp9Cg==';

  // const testCommit = '6e01aa00f4053c35fa16ba70485b5a0fc60d98f6';

  const branch = new Date()
    .toISOString()
    .slice(0, 16)
    .replace('T', '_')
    .replace(':', '-');

  const latestCommitSha = await getMainHead();

  // Might be simpler to have a standing branch that `main` updates from
  const latestTreeSha = await getLastTreeSha(latestCommitSha);
  const blobSha = await getBlobSha(latestTreeSha);
  const blob = await getBlob(blobSha);

  const created = await createTreeObject(latestTreeSha, updateFile(blob));
  const commit = await createCommit(latestCommitSha, created.sha);

  const ref = await createBranch(commit.sha, branch);
  const res = await createPullRequest(branch);

  // return getMainHead()
  //   .then(getLastTreeSha)
  //   .then(sha => {
  //     lastestTreeSha = sha;
  //     return getTree(sha);
  //   })
  //   .then(getBlob);
  //   .then(blob => {
  //     createTreeObject(lastTreeSha, blob);
  //   });
};
