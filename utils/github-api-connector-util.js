import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const BASE_URL = "https://api.github.com";
const API_VERSION = "2022-11-28";
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

/**
 * Handles an error that occurred during an API request.
 *
 * @param {Error} error the error thrown during the request
 */
const handleRequestError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      console.error(
        "Invalid access token. Please check the access token in the .env file."
      );
      return;
    }

    if (error.response.status === 403) {
      console.error(
        "API request forbidden, this is most likely due to exceeding the API rate limit. Please try again later or provide an access token with the correct permissions."
      );
      return;
    }

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    console.error("API request failed. See details above.");
  } else if (error.request) {
    console.error("API request failed. No response received from the server.");
  } else {
    console.log("Error during API request:", error.message);
  }
};

/**
 * Fetches the sha of the commit closest to but not exceeding
 * the given date.
 *
 * @param {string} ownerName the name of the owner of the repository
 * @param {string} repoName the name of the repository
 * @param {string} until the date to get the commit sha for (ISO 8601 format)
 * @returns
 */
const getCommitShaByDate = async (ownerName, repoName, until) => {
  const url = `${BASE_URL}/repos/${ownerName}/${repoName}/commits`;
  const options = {
    params: {
      until: until,
      per_page: 1,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": API_VERSION,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data?.[0]?.sha;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

/**
 * Fetches all release tags along with their release dates
 * for a given repository.
 *
 * @param {string} ownerName the name of the owner of the repository
 * @param {string} repoName the name of the repository
 * @param {string} maxDate the maximum date to fetch release tags for (ISO 8601 format)
 * @returns {Array<{date: string, tag: string}>} an array of objects
 *  containing the release date and tag name
 */
const getReleaseTags = async (ownerName, repoName, maxDate = "now") => {
  if (maxDate === "now") {
    maxDate = new Date().toISOString();
  }

  const url = `${BASE_URL}/repos/${ownerName}/${repoName}/releases`;
  const options = {
    params: {
      per_page: 100,
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": API_VERSION,
    },
  };

  try {
    let result = [];

    while (true) {
      const response = await axios.get(url, options);

      for (const release of response.data) {
        if (release.draft || release.prerelease) continue;

        const date = release.published_at;
        const tag = release.tag_name;

        if (date > maxDate) continue;

        result.push({
          date: date,
          tag: tag,
        });
      }

      if (response.data.length < 100) {
        break;
      }

      options.params.page++;
    }

    return result;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

/**
 * Fetches the sha of the commit associated with the given tag name.
 *
 * @param {string} ownerName the name of the owner of the repository
 * @param {string} repoName the name of the repository
 * @param {string} tagName the name of the tag
 * @returns
 */
const getCommitShaByTagName = async (ownerName, repoName, tagName) => {
  const url = `${BASE_URL}/repos/${ownerName}/${repoName}/git/ref/tags/${tagName}`;
  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": API_VERSION,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.object.sha;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

export { getCommitShaByDate, getReleaseTags, getCommitShaByTagName };
