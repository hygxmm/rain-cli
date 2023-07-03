const axios = require("axios");

axios.interceptors.response.use((response) => {
  return response.data;
});

// 获取仓库列表
async function getTemplateRepo() {
  return axios.get("https://api.github.com/orgs/hygxmm/repos");
}
// 获取仓库tag
async function getTemplateTags(repo) {
  return await axios.get(`https://api.github.com/repos/hygxmm/${repo}/tags`);
}

module.exports = {
  getTemplateRepo,
  getTemplateTags,
};
