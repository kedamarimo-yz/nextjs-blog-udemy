import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");       //ファイル名(id)

        //mdファイルを文字列として取り出す
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        //idとデータを返す
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}


//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
    /* 
        [
            {
                params: {
                    id: "ssg-ssr"
                }
            },
            {
                params: {
                    id: "next-react"
                }
            },
        ] 
    */
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);     //取得したコンテンツをhtml形式に変換

    const blogContentHTML = blogContent.toString();         //コンテンツを渡す為にhtml形式を文字列に変換

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };

}