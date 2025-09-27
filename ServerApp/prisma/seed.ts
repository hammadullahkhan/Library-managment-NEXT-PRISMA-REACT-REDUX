import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface SeedBook {
  title: string
  author: string
  category: string
  price: number
  description: string
  stock: number
  rating: number
  imageUrl?: string
}

const categories: string[] = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery',
  'Romance', 'Biography', 'History', 'Science', 'Technology',
  'Self-Help', 'Business', 'Philosophy', 'Poetry', 'Drama'
]

const sampleBooks: SeedBook[] = [
  { 
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    category: "Fiction", 
    price: 12.99, 
    description: "A classic American novel about the Jazz Age and the American Dream.", 
    stock: 25, 
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
  },
  { 
    title: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    category: "Fiction", 
    price: 14.99, 
    description: "A gripping tale of racial injustice and childhood innocence in the American South.", 
    stock: 30, 
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
  },
  { 
    title: "1984", 
    author: "George Orwell", 
    category: "Science Fiction", 
    price: 13.99, 
    description: "A dystopian social science fiction novel about totalitarian control.", 
    stock: 20, 
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop"
  },
  { 
    title: "Pride and Prejudice", 
    author: "Jane Austen", 
    category: "Romance", 
    price: 11.99, 
    description: "A romantic novel of manners set in Georgian England.", 
    stock: 35, 
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
  },
  { 
    title: "The Catcher in the Rye", 
    author: "J.D. Salinger", 
    category: "Fiction", 
    price: 13.49, 
    description: "A controversial novel about teenage rebellion and alienation.", 
    stock: 22, 
    rating: 3.9,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    price: 16.99,
    description: "Epic science fiction novel set on the desert planet Arrakis.",
    stock: 18,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    price: 12.99,
    description: "A fantasy adventure about Bilbo Baggins and his unexpected journey.",
    stock: 28,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    price: 18.99,
    description: "A brief history of humankind from the Stone Age to the present.",
    stock: 22,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Mystery",
    price: 15.99,
    description: "A psychological thriller about a woman who refuses to speak.",
    stock: 19,
    rating: 4.1,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    price: 17.99,
    description: "A memoir about education, family, and the struggle for self-invention.",
    stock: 24,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 14.99,
    description: "A philosophical story about following your dreams.",
    stock: 32,
    rating: 4.0,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    price: 19.99,
    description: "The authorized biography of Apple's co-founder.",
    stock: 15,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    category: "Science Fiction",
    price: 15.49,
    description: "A survival story about an astronaut stranded on Mars.",
    stock: 21,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop"
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Mystery",
    price: 14.49,
    description: "A psychological thriller about a marriage gone terribly wrong.",
    stock: 17,
    rating: 4.0,
    imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    price: 20.99,
    description: "The memoir of former First Lady Michelle Obama.",
    stock: 26,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    category: "Self-Help",
    price: 16.99,
    description: "A guide to personal and professional effectiveness.",
    stock: 29,
    rating: 4.1,
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    price: 13.99,
    description: "The first book in the magical Harry Potter series.",
    stock: 40,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self-Help",
    price: 12.49,
    description: "A classic guide to wealth and success principles.",
    stock: 23,
    rating: 3.9,
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop"
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    category: "Mystery",
    price: 15.99,
    description: "A gripping Swedish crime thriller.",
    stock: 18,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 17.99,
    description: "An exploration of cosmology for the general reader.",
    stock: 20,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop"
  }
]

// Additional book data for generating more books
const bookTitles: string[] = [
  "The Chronicles", "Midnight Tales", "The Last Stand", "Echoes of Tomorrow",
  "The Hidden Path", "Whispers in Time", "The Golden Age", "Shadows of the Past",
  "The Infinite Loop", "Dreams of Tomorrow", "The Final Chapter", "Lost in Translation",
  "The Art of Living", "Beyond the Horizon", "The Secret Garden", "Tales from Beyond",
  "The Modern World", "Legends Reborn", "The Forgotten Kingdom", "New Beginnings",
  "The Digital Revolution", "Ancient Wisdom", "The Creative Mind", "Future Visions",
  "The Human Experience", "Masters of Craft", "The Innovation Era", "Timeless Stories",
  "The Knowledge Quest", "Revolutionary Ideas", "The Perfect Storm", "Hidden Treasures",
  "The Next Generation", "Breakthrough Moments", "The Essential Guide", "Untold Stories",
  "The Grand Adventure", "Mindful Living", "The Ultimate Challenge", "Sacred Journeys"
]

const authors: string[] = [
  "Alexander Thompson", "Sarah Mitchell", "David Chen", "Emily Rodriguez",
  "Michael Johnson", "Jessica Brown", "Robert Wilson", "Maria Garcia",
  "James Anderson", "Lisa Taylor", "Christopher Davis", "Amanda White",
  "Matthew Martinez", "Jennifer Lee", "Daniel Harris", "Rachel Clark",
  "Kevin Lewis", "Nicole Walker", "Brian Hall", "Stephanie Young",
  "Mark King", "Lauren Wright", "Steven Green", "Melissa Adams",
  "Joshua Nelson", "Rebecca Baker", "Andrew Hill", "Samantha Moore",
  "Eric Scott", "Heather Lewis", "Jonathan Ward", "Katherine Reed",
  "Ryan Torres", "Ashley Cooper", "Brandon Bailey", "Megan Rivera",
  "Tyler Murphy", "Brittany Cook", "Jeremy Rogers", "Crystal Bell"
]

const descriptions = {
  'Fiction': [
    "A captivating story that explores the depths of human nature.",
    "An unforgettable tale of love, loss, and redemption.",
    "A masterful narrative that weaves together multiple storylines.",
    "A thought-provoking exploration of modern society.",
    "An epic journey through the complexities of life."
  ],
  'Science Fiction': [
    "A thrilling adventure into the unknown reaches of space.",
    "An exploration of future technology and its impact on humanity.",
    "A mind-bending journey through time and alternate realities.",
    "A dystopian vision of tomorrow's world.",
    "An epic space opera filled with wonder and danger."
  ],
  'Fantasy': [
    "A magical quest through enchanted realms.",
    "An epic battle between good and evil in a mystical world.",
    "A tale of heroes and legends in a land of magic.",
    "An adventure through kingdoms filled with mythical creatures.",
    "A story of power, magic, and ancient prophecies."
  ],
  'Mystery': [
    "A gripping thriller that will keep you guessing until the end.",
    "A complex puzzle filled with twists and turns.",
    "A dark and suspenseful tale of crime and investigation.",
    "A psychological thriller that explores the criminal mind.",
    "A haunting mystery that unravels long-buried secrets."
  ],
  'Romance': [
    "A heartwarming story of love conquering all obstacles.",
    "A passionate tale of two souls destined to be together.",
    "A romantic journey through the ups and downs of relationships.",
    "A tender story of finding love in unexpected places.",
    "A beautiful exploration of the many faces of love."
  ],
  'Non-Fiction': [
    "An insightful examination of contemporary issues.",
    "A comprehensive guide to understanding complex topics.",
    "An enlightening exploration of real-world phenomena.",
    "A thought-provoking analysis of modern society.",
    "An authoritative work on important subjects."
  ],
  'Biography': [
    "The inspiring life story of a remarkable individual.",
    "An intimate portrait of a influential figure.",
    "The fascinating journey of someone who changed the world.",
    "A detailed account of triumph over adversity.",
    "The compelling story of a life well-lived."
  ],
  'History': [
    "A comprehensive look at pivotal moments in time.",
    "An engaging account of historical events and their impact.",
    "A detailed exploration of civilizations and cultures.",
    "A fascinating journey through the annals of time.",
    "An authoritative study of important historical periods."
  ],
  'Science': [
    "A clear explanation of complex scientific concepts.",
    "An exploration of cutting-edge research and discoveries.",
    "A comprehensive guide to understanding our natural world.",
    "An accessible introduction to scientific principles.",
    "A fascinating look at the wonders of science and technology."
  ],
  'Technology': [
    "An in-depth look at emerging technologies and their applications.",
    "A guide to understanding the digital transformation.",
    "An exploration of how technology is reshaping our world.",
    "A comprehensive overview of technological innovation.",
    "An accessible explanation of complex technical concepts."
  ],
  'Self-Help': [
    "A practical guide to personal growth and development.",
    "Strategies for achieving success and fulfillment.",
    "A roadmap to building better habits and mindset.",
    "Tools for overcoming challenges and reaching your potential.",
    "A comprehensive approach to improving your life."
  ],
  'Business': [
    "Essential strategies for business success and growth.",
    "A guide to leadership and management excellence.",
    "Insights into the world of entrepreneurship and innovation.",
    "A comprehensive approach to building successful organizations.",
    "Proven methods for achieving business objectives."
  ],
  'Philosophy': [
    "A deep exploration of fundamental questions about existence.",
    "An examination of ethical and moral principles.",
    "A thoughtful analysis of the nature of reality and knowledge.",
    "A guide to understanding philosophical concepts and theories.",
    "A comprehensive look at the great philosophical traditions."
  ],
  'Poetry': [
    "A beautiful collection of verses that touch the soul.",
    "Lyrical expressions of human emotion and experience.",
    "A masterful use of language to capture life's essence.",
    "Poetic reflections on love, loss, and the human condition.",
    "A rhythmic journey through the landscape of the heart."
  ],
  'Drama': [
    "A powerful theatrical work that explores human conflict.",
    "A compelling play that examines social and personal issues.",
    "A dramatic exploration of character and motivation.",
    "A thought-provoking work that challenges audiences.",
    "A masterful blend of dialogue, action, and emotion."
  ]
}

async function main(): Promise<void> {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
    console.log('🗑️ Clearing existing data...')
    await prisma.book.deleteMany()
    await prisma.category.deleteMany()

    // Create categories first
    console.log('📁 Creating categories...')
    for (const categoryName of categories) {
      await prisma.category.create({
        data: { name: categoryName }
      })
    }

    // Create initial sample books
    console.log('📚 Creating sample books...')
    for (const book of sampleBooks) {
      await prisma.book.create({
        data: book
      })
    }

    // Generate additional books to reach 200
    console.log('🔄 Generating additional books...')
    const booksToCreate = 200 - sampleBooks.length

    for (let i = 0; i < booksToCreate; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      const randomTitle = bookTitles[Math.floor(Math.random() * bookTitles.length)]
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
      const randomDescriptions = descriptions[randomCategory as keyof typeof descriptions]
      const randomDescription = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)]
      
      // Generate realistic price between $9.99 and $39.99
      const price = Math.round((Math.random() * 30 + 9.99) * 100) / 100
      
      // Generate realistic stock between 5 and 50
      const stock = Math.floor(Math.random() * 46) + 5
      
      // Generate realistic rating between 3.0 and 5.0
      const rating = Math.round((Math.random() * 2 + 3) * 10) / 10
      
      // Generate unique title by adding a suffix
      const uniqueTitle = `${randomTitle} ${Math.floor(Math.random() * 1000) + 1}`
      
      await prisma.book.create({
        data: {
          title: uniqueTitle,
          author: randomAuthor,
          category: randomCategory,
          price: price,
          description: randomDescription,
          stock: stock,
          rating: rating,
          imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=300&h=400&fit=crop`
        }
      })

      // Show progress every 25 books
      if ((i + 1) % 25 === 0) {
        console.log(`   📖 Created ${i + 1} additional books...`)
      }
    }

    // Verify the final count
    const totalBooks = await prisma.book.count()
    const totalCategories = await prisma.category.count()

    console.log('\n✅ Seeding completed successfully!')
    console.log(`📚 Total books created: ${totalBooks}`)
    console.log(`📁 Total categories created: ${totalCategories}`)
    
    // Show category distribution
    console.log('\n📊 Books per category:')
    for (const category of categories) {
      const count = await prisma.book.count({
        where: { category: category }
      })
      console.log(`   ${category}: ${count} books`)
    }

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('💥 Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('🔌 Disconnecting from database...')
    await prisma.$disconnect()
  })