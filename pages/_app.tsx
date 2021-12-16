// global styles shared across the entire site
import '../styles/global.css'

// global style overrides for notion
import '../styles/notion.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// used for collection views selector (optional)
// TODO: re-add if we enable collection view dropdowns
// import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// core styles for static tweet renderer (optional)
import 'react-static-tweets/styles.css'

// global style overrides for prism theme (optional)
// import 'styles/prism-theme.css'

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block
// import 'prismjs'
// import 'prismjs/components/prism-markup'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-typescript'
// import 'prismjs/components/prism-bash'

import { ApolloProvider} from '@apollo/client';
import type { AppProps } from 'next/app'
import { useApollo } from '../libs/apollo-client'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events. 

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  
NProgress.configure({ showSpinner: false, trickleSpeed: 780 });

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
