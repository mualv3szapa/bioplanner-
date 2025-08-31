// next.config.js
const isProd = process.env.NODE_ENV === "production";
// Se for um repositório de projeto, troque pelo nome do repositório:
const repoName = "nome-do-seu-repo";

module.exports = {
  output: "export", // gera site estático em /out
  images: { unoptimized: true }, // evita Image Optimization (não há servidor no Pages)
  // ATENÇÃO: use estas duas linhas APENAS se o site ficar em /<repo> (não no root):
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true, // ajuda o Pages a servir /pasta/index.html
};
