import { Helmet } from "react-helmet-async";

const BASE_URL = "https://lanicat.lovable.app";

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const PageHead = ({ title, description, path, noindex = false }: PageHeadProps) => {
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageHead;
