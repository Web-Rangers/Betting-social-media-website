import type { NextPage } from 'next';
import React from 'react'
import styles from '@styles/pages/Blog.module.css'
import Image from 'next/image';
import { trpc } from 'src/utils/trpc';
import Moment from 'react-moment';
import shortenString from 'src/utils/shortenString';

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
                <SideNews news={news} />
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
            {
                news[0] && <div className={styles.sideNewsMainNews}>
                    <Image
                        src={news[0].image}
                        alt={news[0].title}
                        layout="fill"
                        objectFit='cover'
                    />
                    <div className={styles.info}>
                        <span className={styles.date}>
                            <Moment format='DD MMM YYYY'>
                                {news[0].date}
                            </Moment>
                        </span>
                        <h2 className={styles.title}>
                            {shortenString(news[0].title, 75)}
                        </h2>
                    </div>
                </div>
            }
            {
                news.slice(1, 4).map((news, index) => (
                    <div key={`side_news_${index}`} className={styles.sideNewsOtherNews}>
                        <div className={styles.image}>
                            <Image
                                src={news.image}
                                alt={news.title}
                                height={100}
                                width={100}
                                objectFit='cover'
                            />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.date}>
                                <Moment format='DD MMM YYYY'>
                                    {news.date}
                                </Moment>
                            </span>
                            <h2 className={styles.title}>
                                {shortenString(news.title, 45)}
                            </h2>
                            <div className={styles.stats}>
                                <span className={styles.stat}>
                                    <Image
                                        src="/icons/comment.svg"
                                        alt="comments"
                                        width={16}
                                        height={16}
                                    />
                                    {news.likes}
                                </span>
                                <span className={styles.stat}>
                                    <Image
                                        src="/icons/views-gray.svg"
                                        alt="views"
                                        width={16}
                                        height={16}
                                    />
                                    {news.views}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BlogPage;
