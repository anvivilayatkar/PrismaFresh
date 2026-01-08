import { Flower } from './types';
import { ASSETS } from './imageAssets';

export const FLORIST_WHATSAPP_NUMBER = "917249611277"; 

export const FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Marigold (Genda)',
    price: 350,
    description: 'Vibrant orange garlands sourced daily from local markets. Perfect for poojas.',
    imageUrl: ASSETS.PRODUCT_MARIGOLD,
    category: 'bouquet'
  },
  {
    id: '2',
    name: 'Classic Red Roses',
    price: 850,
    description: 'Velvet red roses wrapped in simple kraft paper. Timeless elegance.',
    imageUrl: ASSETS.PRODUCT_ROSE,
    category: 'bouquet'
  },
  {
    id: '3',
    name: 'Mogra Gajra',
    price: 150,
    description: 'Fragrant jasmine strands for hair, offering a sweet, calming scent.',
    imageUrl: ASSETS.PRODUCT_MOGRA,
    category: 'single'
  },
  {
    id: '4',
    name: 'Pink Lotus',
    price: 1200,
    description: 'Sacred pink lotus blooms, representing purity and divine beauty.',
    imageUrl: ASSETS.PRODUCT_LOTUS,
    category: 'occasion'
  },
  {
    id: '5',
    name: 'Tuberose Stems',
    price: 400,
    description: 'Long-stemmed Rajnigandha. White, elegant, and intensely fragrant.',
    imageUrl: ASSETS.PRODUCT_TUBEROSE,
    category: 'single'
  },
  {
    id: '6',
    name: 'Hibiscus Plant',
    price: 250,
    description: 'A potted red Hibiscus. A staple for Indian gardens and offerings.',
    imageUrl: ASSETS.PRODUCT_HIBISCUS,
    category: 'plant'
  },
  {
    id: '7',
    name: 'Orchid Stem',
    price: 1800,
    description: 'Exotic purple orchids. Minimalist and modern.',
    imageUrl: ASSETS.PRODUCT_ORCHID,
    category: 'plant'
  },
  {
    id: '8',
    name: 'Summer Mix',
    price: 1500,
    description: 'Bright yellow and white blooms to lighten up any room.',
    imageUrl: ASSETS.PRODUCT_MIX,
    category: 'bouquet'
  }
];