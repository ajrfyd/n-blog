import { Helmet } from "react-helmet-async";
import jsImg from "../../assets/javascript.jpg";

type SeoProps = {
  title: string;
  site_name?: string;
  desc: string;
  name?: string;
  url: string;
  imgUrl?: string;
  keyword?: string;
};

const Seo = ({
  title,
  desc,
  url,
  site_name,
  imgUrl,
  keyword = "",
}: SeoProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta
        name="keyword"
        content={`klog, blog, hkound${keyword ? ", " + keyword : ""}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imgUrl ? imgUrl : jsImg} />
    </Helmet>
  );
};

export default Seo;
