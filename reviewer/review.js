import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

try {
  console.log("📦 Fetching PR files...");

  const token = process.env.GITHUB_TOKEN;  
  const octokit = getOctokit(token);

  const { owner, repo, number: pull_number } = context.issue;

  const files = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  console.log(`🔍 Changed files in PR #${pull_number}:`);
  files.data.forEach((file) => {
    console.log(`- ${file.filename}`);
  });

  // Print first 200 characters of patch for preview
  files.data.forEach((file) => {
    const patch = file.patch || "";
    console.log(`\n--- Diff for ${file.filename} ---`);
    console.log(patch.substring(0, 200) + "...");
  });

} catch (error) {
  console.error(error);
  setFailed(error.message);
}
