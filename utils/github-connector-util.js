import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const BASE_URL = 'https://api.github.com';
const API_VERSION = '2022-11-28';
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const getCommitShaByDate = async (owner, repo, until) => {
  const url = `${BASE_URL}/repos/${owner}/${repo}/commits`;
  const options = {
    params: {
      until: until,
      per_page: 1
    },
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': API_VERSION
    }
  }

  try {
    const response = await axios.get(url, options);
    return response.data?.[0]?.sha;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getCommitShaByDate };