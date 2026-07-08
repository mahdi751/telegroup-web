import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path?: string;
  jsonLd?: object;
};

const BASE = "https://telegroup.ca";

export default function Seo({ title, description, path = "/", jsonLd }: Props) {
  const url = `${BASE}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
