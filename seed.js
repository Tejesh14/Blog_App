const mongoose = require('mongoose');
const Blogs = require('./models/blogs');

const data = [
    {
        author: 'Vishy Sharma',
        title: 'Manali Blog',
        img: 'https://images.unsplash.com/photo-1579689189009-874f5cac2db5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbmFsaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: "Hello guys I recently travelled Manali. It is an great place for travelling personally I love the mountain places so I just love Manali. In my opinion everyone should go there once in a life."
    },
    {
        author: 'Pankaj Kumar',
        title: 'Tech Blog',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Virtual Reality has proven to be effective to enhance the training experience for any kind of activity. The immersive learning environments created with virtual reality are ideal for training in secure and efficient settings, while reducing the costs of the learning process and increasing the preparation of the learners. See our infographic with insights on virtual training effectiveness.'
    },
    {
        author: 'Vijay Yadav',
        title: 'Headphones Review Blog',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Recently I had the opportunity to spend some time with Audeze’s premium gaming headset, the Mobius. As a multimedia headphone, I really enjoyed the Mobius, as it had great multi-platform compatibility, an enjoyable tuning and remarkably good technical performance for a gaming headset--even in Bluetooth wireless mode! However, as a gaming headset--which was its intended use--it personally fell a bit flat for me.'
    },
    {
        author: 'Gabbar Singh',
        title: 'Food Blog',
        img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=901&q=80',
        content: "Hello viewers I am Gabbar Singh, Master Chef in Taj Hotel. This is my first blog so let's get started in this nlog I\'m gonna tell you guys about my special Omelette."
    },
    {
        author: 'Lucifer',
        title: 'Los Angeles Blog',
        img: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG9zJTIwYW5nZWxlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Los Angeles also is known as the Hollywood City. It is one of the beautiful cities in the US known for its weather, beaches, and movies. On my recent trip to the US, my husband and I included exploring the Los Angeles City in the itinerary. We stayed in LA for 3 days. There are a lot of things you can do in three days. Of course, you might miss out on a few but we tried to explore most of the fun and popular places during the short visit.'
    }
]

function seedDB(){
    Blogs.insertMany(data)
    .then(()=>{
        console.log('DB Seeded :)')
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = seedDB;