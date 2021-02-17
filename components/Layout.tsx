import Head from "next/head";

interface LayoutProps {
  title: String;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
