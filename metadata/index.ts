import type { Creator } from '../scripts/types/metadata'
import { getAvatarUrlByGithubName } from '../scripts/utils'

/** 文本 */
export const siteName = '幻灵初音藏书库'
export const siteShortName = '藏书库'
export const siteDescription = '以初始之音，响彻寰宇。以书籍之名，指点迷津。'

/** 文档所在目录 */
export const include = ['笔记', '生活']

/** Repo */
export const githubRepoLink = 'https://github.com/timi137137/nolebase'

/** 无协议前缀域名 */
export const plainTargetDomain = 'notes.mikui.cc'
/** 完整域名 */
export const targetDomain = `https://${plainTargetDomain}`

/** 创作者 */
export const creators: Creator[] = [
  {
    name: '絢香猫',
    avatar: '',
    username: 'nekomeowww',
    title: 'Nólëbase 原始创作者',
    desc: '开发者，专注于基础设施维护，数据分析，后端、DevOps 开发',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/nekomeowww' },
      { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/ayakaneko' },
    ],
    nameAliases: ['nekomeowww', '绚香猫', '絢香猫', 'Neko Ayaka', 'Ayaka Neko'],
    emailAliases: ['neko@ayaka.moe'],
  },
  {
    name: '悠静',
    avatar: '',
    username: 'timi137137',
    title: '幻书撰写者',
    desc: '将日常琐事撰写成笔记封存',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/timi137137' },
    ],
    nameAliases: ['timi137', '悠静萝莉', 'timi137137'],
    emailAliases: ['i@mikuhl.cn'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrlByGithubName(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
