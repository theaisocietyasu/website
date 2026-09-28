import { relinkCollectionRoutes } from '@/lib/relink-api'
import { bannersCollection, parseBanner } from '@/lib/relink'

export const { GET, POST, PUT, DELETE } = relinkCollectionRoutes(bannersCollection, parseBanner, 'banner')
