import bcrypt from 'bcryptjs';

const data = {

    users: [
        {
          name: 'IPL',
          email: 'iplt20@gmail.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'MI',
          email: 'mipaltans@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
    ],

    players: [

        {
            name: 'Virat Kohli',
            category: 'Batsmen',
            image: '/images/d1.png',
            price: 17,
            country: 'India',
            international: 'capped',
            ranking: 1,
            description: 'Indian Captain',
            soldTo: 'Yet to buy'
        },

        {
            name: 'MS Dhoni',
            category: 'Keeper',
            image: '/images/d2.png',
            price: 15,
            country: 'India',
            international: 'retired',
            ranking: 0,
            description: 'Ex Indian Captain',
            soldTo: 'CSK'
        },

        {
            name: 'Rohit Sharma',
            category: 'Batsmen',
            image: '/images/d3.png',
            price: 15,
            country: 'India',
            international: 'capped',
            ranking: 5,
            description: 'Indian Vice Captain',
            soldTo: 'Yet to buy'
        },

        {
            name: 'Eoin Morgan',
            category: 'Batsmen',
            image: '/images/d4.png',
            price: 12,
            country: 'England',
            international: 'overseas',
            ranking: 5,
            description: 'English Captain',
            soldTo: 'Yet to buy'
        },

        {
            name: 'Steve Smith',
            category: 'Batsmen',
            image: '/images/d5.png',
            price: 10,
            country: 'Australia',
            international: 'overseas',
            ranking: 4.5,
            description: 'Ex Aus Captain',
            soldTo: 'Yet to buy'
        },

        {
            name: 'David Warner',
            category: 'Batsmen',
            image: '/images/d6.png',
            price: 15,
            country: 'Australia',
            international: 'overseas',
            ranking: 4.5,
            description: 'Ex Aus Vice Captain',
            soldTo: 'Yet to buy'
        },
    ]
}

export default data