/// <reference types="vitest" />

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const communityPageSource = fs.readFileSync(
  path.resolve(process.cwd(), 'app/community/page.tsx'),
  'utf8'
);

const postTypeBlock = communityPageSource.match(/type Post = \{([\s\S]*?)\n\};/m)?.[1] ?? '';

describe('Community page - BE response shape', () => {
  it('defines Post with likesCount instead of legacy _count.likes', () => {
    expect(postTypeBlock).toContain('likesCount: number;');
    expect(communityPageSource).toMatch(/const \[likesCount,\s*setLikesCount\] = useState\(post\.likesCount\);/);
    expect(communityPageSource).toMatch(/\{likesCount\}\s*Yêu thích/);
  });

  it('defines Post with commentsCount instead of legacy _count.comments', () => {
    expect(postTypeBlock).toContain('commentsCount: number;');
    expect(communityPageSource).toMatch(/const \[commentsCount,\s*setCommentsCount\] = useState\(post\.commentsCount\);/);
    expect(communityPageSource).toMatch(/\{commentsCount\}\s*Bình luận/);
  });

  it('uses liked boolean for initial like state instead of a likes array', () => {
    expect(postTypeBlock).toContain('liked: boolean;');
    expect(communityPageSource).toMatch(/const \[isLiked,\s*setIsLiked\] = useState\(post\.liked\);/);
    expect(communityPageSource).not.toMatch(/useState\(post\.likes\b/);
    expect(communityPageSource).not.toMatch(/likes\.some\(/);
  });

  it('does not depend on _count being present, guarding against undefined crashes', () => {
    expect(postTypeBlock).not.toContain('_count');
    expect(postTypeBlock).not.toMatch(/\blikes\s*:/);
    expect(communityPageSource).not.toMatch(/post\._count/);
    expect(communityPageSource).not.toMatch(/_count\?\./);
  });
});
