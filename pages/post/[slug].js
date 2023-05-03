import React from 'react';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { AdjacentPosts } from '../../sections';
import Head from 'next/head';

const PostDetails = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />

                <title>{post.title}</title>
                <meta name="description" content={post.excerpt}></meta>
                <meta name="author" content="Sudhanshu Samal" />
                <meta property="og:image" content={post.image[0].url} />
                <meta property="og:image:alt" content="Banner for the site" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="675" />
                <meta property="og:title" content={post.title}></meta>
                <meta property="og:site_name" content="Chiku Blog" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={post.excerpt} />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author admin={post.admin} />
                        <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
        props: {
            post: data,
        },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    };
}