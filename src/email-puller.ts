import axios from 'axios';
import cheerio from 'cheerio';

const websites = ['http://www.loganbrown.co.nz'];

console.log(`number of found websites,${websites.length}`);
console.log('url,emails');

async function findSubdirectories(url: string): Promise<string[]> {
    const response = await axios.get(url);
    const content = response.data;
    const subdirs = content.match(/href=['"]?([^'">]+)/g) || [];
    return subdirs;
}

function cleanSubdirectories(subdirs: string[]): string[] {
    return subdirs.filter(subdir => /^https?:\/\/\S+/.test(subdir));
}

async function findEmails(url: string): Promise<string[]> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const text = $.text();
    const emails = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
    return emails;
}

async function processEmails(url: string): Promise<void> {
    const subdirectories = await findSubdirectories(url);
    const cleandirs = cleanSubdirectories(subdirectories);
    let checkedemails: string[] = [];

    for (const dir of cleandirs) {
        const emails = await findEmails(dir);
        checkedemails = [...checkedemails, ...emails];
    }

    const uniqueEmails = Array.from(new Set(checkedemails));
    console.log(`${url},${uniqueEmails.join(';')}`);
}

async function main() {
    for (const website of websites) {
        await processEmails(website);
    }
}

main();
