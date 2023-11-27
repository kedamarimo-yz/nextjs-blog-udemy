import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';


//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  //console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

/* //SSRの場合
export async function getServerSideProps(context) {
  return {
    props: {
      //コンポーネントに渡すためのprops
    },
  };
} */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>私はNextjsエンジニアです/好きなフレームワークはNext.jsです</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                </Link>
                <Link href={`/posts/${id}`}>
                  <p className={utilStyles.boldText}>{`${title}`}</p>
                </Link>
                {/* <br /> */}
                <small className={utilStyles.lightText}>{`${date}`}</small>
              </article>
          ))}
        </div>
      </section>

    </Layout>
  );
}
