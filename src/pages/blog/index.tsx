import type { NextPage } from 'next';
import React from 'react'
import styles from '@styles/pages/Blog.module.css'
import Image from 'next/image';
import { trpc } from 'src/utils/trpc';
import Moment from 'react-moment';

const BlogPage: NextPage = () => {
    const { data: news, isLoading: newsLoading } = trpc.useQuery(['news.getAll']);

    if (newsLoading) {
        return <div>Loading...</div>
    }

    if (!news) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainColumn}>
                {news[0] && <MainNews {...news[0]} />}
            </div>
            <div className={styles.sideColumn}>

            </div>
        </>
    )
}

interface MainNewsProps {
    title: string,
    date: string,
    image: string,
    likes: number,
    comments: number,
    views: number,
}

const MainNews: React.FC<MainNewsProps> = (props) => {
    const { title, date, image, likes, comments, views } = props;

    return (
        <div className={styles.mainNews}>
            <div className={styles.mainNewsLabel}>Popular</div>
            <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit='cover'
            />
            <div className={styles.mainNewsInfo}>
                <span className={styles.mainNewsDate}>
                    <Moment format='DD MMM YYYY'>
                        {date}
                    </Moment>
                </span>
                <h2 className={styles.mainNewsTitle}>
                    {title}
                </h2>
            </div>
            <div className={styles.mainNewsStats}>
                <span className={styles.mainNewsStat}>
                    <Image
                        src="/icons/like.svg"
                        alt="like"
                        width={24}
                        height={24}
                    />
                    {likes}
                </span>
                <span className={styles.mainNewsStat}>
                    <Image
                        src="/icons/comment-white.svg"
                        alt="comment"
                        width={24}
                        height={24}
                    />
                    {comments}
                </span>
                <span className={styles.mainNewsStat}>
                    <Image
                        src="/icons/views.svg"
                        alt="view"
                        width={24}
                        height={24}
                    />
                    {views}
                </span>
            </div>
        </div>
    )
}

interface SideNewsProps {
    news: {
        title: string,
        date: string,
        image: string,
        likes: number,
        comments: number,
        views: number,
    }[]
}

const SideNews: React.FC<SideNewsProps> = (props) => {
    const { news } = props;

    return (
        <div className={styles.sideNews}>
        </div>
    )
}

export default BlogPage;
