import { content } from './content'

export function findReleaseFromSlug(slug: string) {
  return content.releases.find(release => release.slug === slug)
}
