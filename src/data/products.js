/**
 * Product Data
 * 
 * Contains all product information for the ART BREATHER store.
 * Each product has: id, title, category, price, description, material, image
 */

const products = [
  {
    id: 1,
    title: "Silhouette at Sunset",
    category: "Painting",
    price: 489,
    description: "A bold silhouette artwork set against a vibrant pink and golden sunset, capturing a quiet and expressive moment through strong contrast and warm tones. Approx. Size: 10 × 12 inches.",
    material: "Acrylic",
    image: "1 a.jpg",
    images: ["1 a.jpg", "1 b (2).jpg", "1 c.jpg"]
  },
  {
    id: 2,
    title: "Webbed Hero Bookmark",
    category: "Bookmark",
    price: 1499,
    description: "A handmade superhero-inspired bookmark featuring bold red-and-black tones and playful yellow accents, perfect for adding a creative touch to your reading time. Approx. Size: Bookmark size (2 × 6 inches).",
    material: "Handmade Paper / Mixed Media",
    image: "2 a.jpg",
    images: ["2 a.jpg", "2 b.jpg", "2 c.jpg"]
  },
  {
    id: 3,
    title: "Lost in a Story",
    category: "Pencil Drawing",
    price: 299,
    description: "A gentle pencil sketch capturing the peaceful imagination of a child immersed in a book, drawn with expressive lines and simple detailing. Approx. Size: 8 × 10 inches.",
    material: "Pencil",
    image: "3 a.jpg",
    images: ["3 a.jpg", "3 b.jpg", "3 c.jpg"]
  },
  {
    id: 4,
    title: "Floral Elegance",
    category: "Pencil Drawing",
    price: 549,
    description: "A delicate line-art portrait featuring a graceful hairstyle decorated with tiny flowers, creating a simple and elegant handmade aesthetic. Approx. Size: 8 × 11 inches.",
    material: "Pencil",
    image: "4 a.jpg",
    images: ["4 a.jpg", "4 b.jpg", "4 c.jpg"]
  },
  {
    id: 5,
    title: "Sai Baba — Divine Blessings",
    category: "Painting",
    price: 369,
    description: "A bold handmade Sai Baba artwork created with striking orange, black and white tones, capturing a peaceful and spiritual presence through a strong artistic style. Approx. Size: 9 × 12 inches.",
    material: "Acrylic",
    image: "5 a.jpg",
    images: ["5 a.jpg", "5 b.jpg", "5 c.jpg"]
  },
  {
    id: 6,
    title: "The Lone Tree",
    category: "Painting",
    price: 289,
    description: "A textured landscape portraying a solitary tree against a misty sky and deep red field, creating a calm yet dramatic atmosphere. Approx. Size: 8 × 10 inches.",
    material: "Acrylic",
    image: "6 a.jpg",
    images: ["6 a.jpg", "6 b.jpg", "6 c.jpg"]
  },
  {
    id: 7,
    title: "Playful Expressions",
    category: "Illustration",
    price: 259,
    description: "An expressive handmade character artwork created with lively line work, playful personality, and charming detailing. Approx. Size: 7 × 9 inches.",
    material: "Mixed Media",
    image: "7 a.jpg",
    images: ["7 a.jpg", "7 b.jpg", "7 c.jpg"]
  },
  {
    id: 8,
    title: "Harmonic Reflections",
    category: "Pencil Drawing",
    price: 299,
    description: "A meticulously crafted handmade drawing showcasing soft gradient shading, rich contrasts, and evocative artistic depth. Approx. Size: 8 × 10 inches.",
    material: "Pencil",
    image: "8 a.jpg",
    images: ["8 a.jpg", "8 b.jpg", "8 c.jpg"]
  },
  {
    id: 9,
    title: "Countryside Cottage Retreat",
    category: "Painting",
    price: 239,
    description: "A serene rustic countryside landscape featuring a charming roofed cottage nestled amidst rolling green hills and quiet fields. Approx. Size: 8 × 10 inches.",
    material: "Mixed Media",
    image: "9 a.jpg",
    images: ["9 a.jpg", "9 b.jpg", "9 c.jpg"]
  },
  {
    id: 10,
    title: "Bonsai Twilight Silhouette",
    category: "Painting",
    price: 199,
    description: "An evocative silhouette of a stylized bonsai tree against an intense, radiant dusk sky gradient, highlighting tranquil zen aesthetics. Approx. Size: 6 × 8 inches.",
    material: "Mixed Media",
    image: "10 a.jpg",
    images: ["10 a.jpg", "10 b.jpg", "10c.jpg"]
  },
  {
    id: 11,
    title: "Blooming Hibiscus Sun",
    category: "Illustration",
    price: 189,
    description: "A delicate botanical illustration of a fresh pink hibiscus flower soaking in gentle golden sunshine, accented with subtle pencil shading. Approx. Size: 7 × 9 inches.",
    material: "Pencil",
    image: "11 a.jpg",
    images: ["11 a.jpg", "11 b.jpg", "11 c.jpg"]
  },
  {
    id: 12,
    title: "Melody on a Branch",
    category: "Illustration",
    price: 199,
    description: "A charming handmade songbird perched gently on a blossom twig, rendered in vivid crayon shades that bring natural warmth to any room. Approx. Size: 8 × 10 inches.",
    material: "Crayon",
    image: "12 a.jpg",
    images: ["12 a.jpg", "12 b.jpg", "12 c.jpg"]
  },
  {
    id: 13,
    title: "Gaze of Insight — Eye Study",
    category: "Pencil Drawing",
    price: 209,
    description: "An intricate anatomical eye and brow pencil study displaying lifelike pupil reflections, detailed iris fibers, and delicate lash work. Approx. Size: 6 × 8 inches.",
    material: "Pencil",
    image: "13 a.jpg",
    images: ["13 a.jpg", "13 b.jpg", "13 c.jpg"]
  },
  {
    id: 14,
    title: "Midnight Flitter Bat",
    category: "Illustration",
    price: 219,
    description: "A whimsical handmade bat illustration soaring with outspread wings against a dreamy moonlit sky, created with playful color blends. Approx. Size: 7 × 9 inches.",
    material: "Crayon",
    image: "14 a.jpg",
    images: ["14 a.jpg", "14 b.jpg", "14 c.jpg"]
  },
  {
    id: 15,
    title: "Underwater Coral Serenade",
    category: "Illustration",
    price: 239,
    description: "A lively aquatic illustration capturing a pink tropical fish gliding past rising air bubbles and shimmering ocean currents. Approx. Size: 8 × 10 inches.",
    material: "Mixed Media",
    image: "15 a.jpg",
    images: ["15 a.jpg", "15 b.jpg", "15 c.jpg"]
  },
  {
    id: 16,
    title: "Whispering Thoughts Portrait",
    category: "Pencil Drawing",
    price: 199,
    description: "A sensitive and introspective pencil sketch of a young woman lost in thought, captured with light feather-touch pencil strokes. Approx. Size: 8 × 11 inches.",
    material: "Pencil",
    image: "16 a.jpg",
    images: ["16 a.jpg", "16 b.jpg", "16 c.jpg"]
  },
  {
    id: 17,
    title: "Urban Lines on Canvas",
    category: "Painting",
    price: 279,
    description: "A modern architectural study on mini-canvas framing utility lines and cables against an open sky, celebrating everyday urban geometry. Approx. Size: 6 × 6 inches.",
    material: "Acrylic",
    image: "17 a.jpg",
    images: ["17 a.jpg", "17 b.jpg", "17 c.jpg"]
  },
  {
    id: 18,
    title: "Wisdom of Generations — Elder Portrait",
    category: "Pencil Drawing",
    price: 999,
    description: "A master-level hyper-detailed pencil portrait of a venerable elder with turban, capturing deep character lines, warmth, and lifelong wisdom. Approx. Size: 11 × 14 inches.",
    material: "Pencil",
    image: "18 a.jpg",
    images: ["18 a.jpg", "18 b.jpg", "18 c.jpg"]
  },
  {
    id: 19,
    title: "Floral Bloom Tresses",
    category: "Pencil Drawing",
    price: 499,
    description: "A graceful profile drawing of an elegant braided hairstyle adorned with blooming floral pins, evoking poetic charm and quiet beauty. Approx. Size: 8 × 10 inches.",
    material: "Mixed Media",
    image: "19 a.jpg",
    images: ["19 a.jpg", "19 b.jpg", "19 c.jpg"]
  },
  {
    id: 20,
    title: "Mighty Lad Hero",
    category: "Illustration",
    price: 199,
    description: "A vibrant, cheerful character drawing of the beloved Indian hero Chhota Bheem holding a golden laddu, full of heart and childlike vigor. Approx. Size: 8 × 10 inches.",
    material: "Crayon",
    image: "20 a.jpg",
    images: ["20 a.jpg", "20 b.jpg", "20 c.jpg"]
  },
  {
    id: 21,
    title: "Golden Hour Riverbed",
    category: "Painting",
    price: 399,
    description: "A breathtaking atmospheric landscape showing a gentle river winding through hills toward a glowing sunset horizon with warm reflection ripples. Approx. Size: 10 × 12 inches.",
    material: "Mixed Media",
    image: "21 a.jpg",
    images: ["21 a.jpg", "21 b.jpg", "21 c.jpg"]
  },
  {
    id: 22,
    title: "Cheerful Village Girl",
    category: "Illustration",
    price: 229,
    description: "A lovable handmade artwork depicting Chutki in her traditional red ghagra choli with a joyful smile and playful braids. Approx. Size: 8 × 10 inches.",
    material: "Crayon",
    image: "22 a.jpg",
    images: ["22 a.jpg", "22 b.jpg", "22 c.jpg"]
  },
  {
    id: 23,
    title: "Wings of Twilight Angel",
    category: "Illustration",
    price: 559,
    description: "A silhouette illustration of a winged child angel standing peacefully before a rich violet-to-orange evening dusk. Approx. Size: 9 × 12 inches.",
    material: "Mixed Media",
    image: "23 a.jpg",
    images: ["23 a.jpg", "23 b.jpg", "23 c.jpg"]
  },
  {
    id: 24,
    title: "Sweet Feast Feathered Pair",
    category: "Illustration",
    price: 449,
    description: "Two adorable garden birds joyfully perched together sharing a crisp, juicy red watermelon wedge on a sunny afternoon. Approx. Size: 9 × 11 inches.",
    material: "Crayon",
    image: "24 a.jpg",
    images: ["24 a.jpg", "24 b.jpg", "24 c.jpg"]
  },
  {
    id: 25,
    title: "Classic Pals — Tom & Jerry",
    category: "Illustration",
    price: 489,
    description: "The timeless comedic duo Tom and Jerry rendered with cheerful thumbs-up gestures and bright, energetic crayon textures. Approx. Size: 9 × 12 inches.",
    material: "Crayon",
    image: "25 a.jpg",
    images: ["25 a.jpg", "25 b.jpg", "25 c.jpg"]
  },
  {
    id: 26,
    title: "Autumn Walk Hand in Hand",
    category: "Painting",
    price: 899,
    description: "A romantic scenic painting of a couple walking arm-in-arm along an avenue of trees with falling golden leaves on a wet asphalt pathway. Approx. Size: 12 × 16 inches.",
    material: "Mixed Media",
    image: "26 a.jpg",
    images: ["26 a.jpg", "26 b.jpg", "26 c.jpg"]
  },
  {
    id: 27,
    title: "Crimson Echo Silhouette",
    category: "Painting",
    price: 749,
    description: "A textured acrylic artwork on stretched canvas portraying a bold side profile silhouette against a deep glowing crimson and amber background. Approx. Size: 8 × 10 inches.",
    material: "Acrylic",
    image: "27 a.jpg",
    images: ["27 a.jpg", "27 b.jpg", "27 c.jpg"]
  },
  {
    id: 28,
    title: "Innocent Grace — Namaste Child",
    category: "Pencil Drawing",
    price: 949,
    description: "A tender, lifelike graphite pencil portrait of a smiling young Indian girl greeting with a warm namaste gesture, rich with warmth and joy. Approx. Size: 11 × 14 inches.",
    material: "Pencil",
    image: "28 a.jpg",
    images: ["28 a.jpg", "28 b.jpg"]
  },
  {
    id: 29,
    title: "Dune Wanderer at Dusk",
    category: "Painting",
    price: 569,
    description: "A picturesque desert silhouette depicting a traveler atop a camel crossing desert sand dunes against a blazing setting sun. Approx. Size: 10 × 14 inches.",
    material: "Mixed Media",
    image: "29 a.jpg",
    images: ["29 a.jpg", "29 b.jpg"]
  },
  {
    id: 30,
    title: "Crimson Meadow Solitude",
    category: "Painting",
    price: 699,
    description: "A solitary tree standing resiliently amidst an expansive crimson poppy meadow beneath an overcast silver-grey sky on primed canvas. Approx. Size: 8 × 10 inches.",
    material: "Acrylic",
    image: "30 a.jpg",
    images: ["30 a.jpg", "30 b.jpg", "30 c.jpg"]
  },
  {
    id: 31,
    title: "Luminescent Midnight Butterfly",
    category: "Painting",
    price: 549,
    description: "A luminous neon blue butterfly glowing within a deep celestial night, surrounded by shimmering stardust specks and ambient light. Approx. Size: 8 × 8 inches.",
    material: "Acrylic",
    image: "31 a.jpg",
    images: ["31 a.jpg", "31 b.jpg"]
  },
  {
    id: 32,
    title: "Studious Moments — Pencil Study",
    category: "Pencil Drawing",
    price: 249,
    description: "A delightful graphite pencil sketch of an earnest boy sitting down absorbed in his math notebook, capturing childhood dedication. Approx. Size: 8 × 10 inches.",
    material: "Pencil",
    image: "32 a.jpeg",
    images: ["32 a.jpeg"]
  },
  {
    id: 33,
    title: "Spiritual Presence — Sai Baba",
    category: "Painting",
    price: 369,
    description: "An expressive devotional artwork of Shirdi Sai Baba with bold high-contrast contours, saffron head wrap, and compassionate gaze. Approx. Size: 9 × 12 inches.",
    material: "Acrylic",
    image: "33 a.jpeg",
    images: ["33 a.jpeg"]
  },
  {
    id: 34,
    title: "Web-Slinger Hero Bookmark",
    category: "Bookmark",
    price: 249,
    description: "A handmade collectible bookmark featuring Spider-Man's masked suit pattern on archival cardstock, marked with golden heart accents. Approx. Size: Bookmark size (2 × 6 inches).",
    material: "Handmade Paper / Mixed Media",
    image: "34 a.jpeg",
    images: ["34 a.jpeg"]
  }
];

export default products;
