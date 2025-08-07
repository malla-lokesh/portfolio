import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="text-5xl font-bold py-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-4xl font-bold py-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-3xl font-bold py-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-2xl font-bold">{children}</h4>,
  h5: ({ children }) => <h5 className="text-xl font-bold">{children}</h5>,
  h6: ({ children }) => <h6 className="text-lg font-bold">{children}</h6>,
  p: ({ children }) => <p className="text-gray-400">{children}</p>,
};

export default components;
