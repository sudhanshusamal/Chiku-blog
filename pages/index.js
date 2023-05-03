
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'
import { getPosts } from '../services' 
import { FeaturedPosts } from '../sections'

export default function Home({ posts }) {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />

                <title>Browse All Blog || Chiku Blog</title>
                <meta name="description" content=" Browse All Blog on Chiku Blog related to Web Development and More..."></meta>
                <meta name="author" content="Sudhanshu Samal" />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:image:alt" content="Banner for the site" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="675" />
                <meta property="og:title" content="Chiku Blog"></meta>
                <meta property="og:site_name" content="Chiku Blog" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Chiku Blog developed By Sudhanshu Samal" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            // eslint-disable-next-line react/jsx-key
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts }
  }
}