import { relinkCollectionRoutes } from '@/lib/relink-api'
import { linksCollection, parseLink } from '@/lib/relink'

export const { GET, POST, PUT, DELETE } = relinkCollectionRoutes(linksCollection, parseLink, 'link')
