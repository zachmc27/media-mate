import { Media} from '../models/media.js';
// sets movies equal to the movies.json file

const movies = {
    "page": 1,
    "results": [
      {
        "backdrop_path": "/3xN4vNPWBSVDsiiOzL5sB95Sa1J.jpg",
        "id": 257094,
        "title": "Holland",
        "original_title": "Holland",
        "overview": "Nancy is a teacher whose life with her husband in Holland, Michigan, tumbles into a twisted tale when she and her colleague become suspicious of a secret.",
        "poster_path": "/39jIr3A4ScUeGxFdMeARYKNxTgU.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          53,
          9648
        ],
        "popularity": 203.8944,
        "release_date": "2025-03-27",
        "video": false,
        "vote_average": 5.4,
        "vote_count": 79
      },
      {
        "backdrop_path": "/u7j9GwAzEuDmYikzhMDWC9kCAiG.jpg",
        "id": 447273,
        "title": "Snow White",
        "original_title": "Snow White",
        "overview": "Princess Snow White flees the castle when the Evil Queen, in her jealousy over Snow White's inner beauty, tries to kill her. Deep into the dark woods, she stumbles upon seven magical dwarves and a young thief named Jonathan. Together, they strive to survive the Queen's relentless pursuit and aspire to take back the kingdom in the process...",
        "poster_path": "/xWWg47tTfparvjK0WJNX4xL8lW2.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          10751,
          14
        ],
        "popularity": 272.2751,
        "release_date": "2025-03-19",
        "video": false,
        "vote_average": 4.388,
        "vote_count": 406
      },
      {
        "backdrop_path": "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
        "id": 1197306,
        "title": "A Working Man",
        "original_title": "A Working Man",
        "overview": "Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss's daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.",
        "poster_path": "/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          80,
          53
        ],
        "popularity": 204.2154,
        "release_date": "2025-03-26",
        "video": false,
        "vote_average": 6.9,
        "vote_count": 46
      },
      {
        "backdrop_path": "/1w8kutrRucTd3wlYyu5QlUDMiG1.jpg",
        "id": 762509,
        "title": "Mufasa: The Lion King",
        "original_title": "Mufasa: The Lion King",
        "overview": "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.",
        "poster_path": "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          12,
          10751,
          16
        ],
        "popularity": 228.9152,
        "release_date": "2024-12-18",
        "video": false,
        "vote_average": 7.452,
        "vote_count": 1787
      },
      {
        "backdrop_path": "/wM2Yxpihaz8ZJDXYlO1mrgyfI8f.jpg",
        "id": 1124620,
        "title": "The Monkey",
        "original_title": "The Monkey",
        "overview": "When twin brothers find a mysterious wind-up monkey, a series of outrageous deaths tear their family apart. Twenty-five years later, the monkey begins a new killing spree forcing the estranged brothers to confront the cursed toy.",
        "poster_path": "/yYa8Onk9ow7ukcnfp2QWVvjWYel.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          27,
          35
        ],
        "popularity": 110.7749,
        "release_date": "2025-02-14",
        "video": false,
        "vote_average": 5.9,
        "vote_count": 305
      },
      {
        "backdrop_path": "/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg",
        "id": 1241982,
        "title": "Moana 2",
        "original_title": "Moana 2",
        "overview": "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
        "poster_path": "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          16,
          12,
          10751,
          35
        ],
        "popularity": 214.3289,
        "release_date": "2024-11-21",
        "video": false,
        "vote_average": 7.118,
        "vote_count": 2091
      },
      {
        "backdrop_path": "/2n7lYEeIbucsEQCswRcVB6ZYmMP.jpg",
        "id": 777443,
        "title": "The Electric State",
        "original_title": "The Electric State",
        "overview": "An orphaned teen hits the road with a mysterious robot to find her long-lost brother, teaming up with a smuggler and his wisecracking sidekick.",
        "poster_path": "/1TZ9Er1xEAKizzKKqYVgJIhNkN2.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          878,
          12,
          28
        ],
        "popularity": 128.0038,
        "release_date": "2025-03-07",
        "video": false,
        "vote_average": 6.6,
        "vote_count": 839
      },
      {
        "backdrop_path": "/qUc0Hol3eP74dbW4YyqT6oRLYgT.jpg",
        "id": 696506,
        "title": "Mickey 17",
        "original_title": "Mickey 17",
        "overview": "Unlikely hero Mickey Barnes finds himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the job… to die, for a living.",
        "poster_path": "/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          878,
          35,
          12
        ],
        "popularity": 73.9551,
        "release_date": "2025-02-28",
        "video": false,
        "vote_average": 6.974,
        "vote_count": 1015
      },
      {
        "backdrop_path": "/sNx1A3822kEbqeUxvo5A08o4N7o.jpg",
        "id": 1195506,
        "title": "Novocaine",
        "original_title": "Novocaine",
        "overview": "When the girl of his dreams is kidnapped, everyman Nate turns his inability to feel pain into an unexpected strength in his fight to get her back.",
        "poster_path": "/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          35,
          53
        ],
        "popularity": 49.718,
        "release_date": "2025-03-12",
        "video": false,
        "vote_average": 7,
        "vote_count": 117
      },
      {
        "backdrop_path": "/aJZ33UhVlInyFENbH4GK4s0k6E0.jpg",
        "id": 774100,
        "title": "Alexander and the Terrible, Horrible, No Good, Very Bad Road Trip",
        "original_title": "Alexander and the Terrible, Horrible, No Good, Very Bad Road Trip",
        "overview": "Eleven-year-old Alexander and his family embark on a dream Spring Break vacation to Mexico City only to have all their plans go terribly wrong when they discover a cursed idol.",
        "poster_path": "/fLpIMf6jfdWg9mxIm8RP5uzdp47.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          35,
          10751
        ],
        "popularity": 41.3942,
        "release_date": "2025-03-26",
        "video": false,
        "vote_average": 6.2,
        "vote_count": 15
      },
      {
        "backdrop_path": "/gsQJOfeW45KLiQeEIsom94QPQwb.jpg",
        "id": 1125899,
        "title": "Cleaner",
        "original_title": "Cleaner",
        "overview": "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
        "poster_path": "/mwzDApMZAGeYCEVjhegKvCzDX0W.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          53
        ],
        "popularity": 559.235,
        "release_date": "2025-02-19",
        "video": false,
        "vote_average": 6.6,
        "vote_count": 107
      },
      {
        "backdrop_path": "/9p2tVEEWw1M92Pt63Vbq7EjBpvk.jpg",
        "id": 1084199,
        "title": "Companion",
        "original_title": "Companion",
        "overview": "During a weekend getaway at a secluded lakeside estate, a group of friends finds themselves entangled in a web of secrets, deception, and advanced technology. As tensions rise and loyalties are tested, they uncover unsettling truths about themselves and the world around them.",
        "poster_path": "/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          35,
          27,
          878,
          53
        ],
        "popularity": 91.2021,
        "release_date": "2025-01-22",
        "video": false,
        "vote_average": 7.1,
        "vote_count": 907
      },
      {
        "backdrop_path": "/8eifdha9GQeZAkexgtD45546XKx.jpg",
        "id": 822119,
        "title": "Captain America: Brave New World",
        "original_title": "Captain America: Brave New World",
        "overview": "After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
        "poster_path": "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          53,
          878
        ],
        "popularity": 418.0554,
        "release_date": "2025-02-12",
        "video": false,
        "vote_average": 6.098,
        "vote_count": 1139
      },
      {
        "backdrop_path": "/tPJQ5wTZMabs8coH320GiEm8PnO.jpg",
        "id": 604685,
        "title": "Den of Thieves 2: Pantera",
        "original_title": "Den of Thieves 2: Pantera",
        "overview": "Big Nick is back on the hunt in Europe and closing in on Donnie, who is embroiled in the treacherous and unpredictable world of diamond thieves and the infamous Panther mafia, as they plot a massive heist of the world's largest diamond exchange.",
        "poster_path": "/rxcyxxarD17xMliStDEhM6y2AYQ.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          80,
          53
        ],
        "popularity": 27.8192,
        "release_date": "2025-01-08",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 361
      },
      {
        "backdrop_path": "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
        "id": 533535,
        "title": "Deadpool & Wolverine",
        "original_title": "Deadpool & Wolverine",
        "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
        "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          35,
          878
        ],
        "popularity": 65.9481,
        "release_date": "2024-07-24",
        "video": false,
        "vote_average": 7.6,
        "vote_count": 6965
      },
      {
        "backdrop_path": "/dGULFnPJKPh0sdu3F64YmQ0qcym.jpg",
        "id": 972533,
        "title": "Last Breath",
        "original_title": "Last Breath",
        "overview": "Last Breath follows a seasoned deep-sea diver as he battles the raging elements to rescue his crewmate trapped hundreds of feet below the ocean's surface.",
        "poster_path": "/w04Xg5Bnqj7ECdCxTsHgqK6AtJW.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          53,
          18
        ],
        "popularity": 52.7391,
        "release_date": "2025-02-27",
        "video": false,
        "vote_average": 6,
        "vote_count": 92
      },
      {
        "backdrop_path": "/gxO51FVgADhYGGnnRPIlutVqb30.jpg",
        "id": 1233575,
        "title": "Black Bag",
        "original_title": "Black Bag",
        "overview": "When his beloved wife is suspected of betraying the nation, an intelligence agent faces the ultimate test – loyalty to his marriage or his country.",
        "poster_path": "/9z32e4ziLQs10NYewgO2CqUWjM7.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          18,
          53,
          9648
        ],
        "popularity": 43.3838,
        "release_date": "2025-03-12",
        "video": false,
        "vote_average": 6.6,
        "vote_count": 118
      },
      {
        "backdrop_path": "/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg",
        "id": 933260,
        "title": "The Substance",
        "original_title": "The Substance",
        "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
        "poster_path": "/cGm2qnmXx9tFabmzEIkJZjCJdQd.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          27,
          878
        ],
        "popularity": 56.4492,
        "release_date": "2024-09-07",
        "video": false,
        "vote_average": 7.135,
        "vote_count": 4310
      },
      {
        "backdrop_path": "/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg",
        "id": 1138194,
        "title": "Heretic",
        "original_title": "Heretic",
        "overview": "Two young missionaries are forced to prove their faith when they knock on the wrong door and are greeted by a diabolical Mr. Reed, becoming ensnared in his deadly game of cat-and-mouse.",
        "poster_path": "/fr96XzlzsONrQrGfdLMiwtQjott.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          27,
          53
        ],
        "popularity": 41.0772,
        "release_date": "2024-10-31",
        "video": false,
        "vote_average": 7.1,
        "vote_count": 1444
      },
      {
        "backdrop_path": "/hmZnqijPaaACjenDkrbWcCmcADI.jpg",
        "id": 549509,
        "title": "The Brutalist",
        "original_title": "The Brutalist",
        "overview": "Escaping post-war Europe, visionary architect László Toth arrives in America to rebuild his life. On his own in a strange new country, a wealthy industrialist recognizes his talent. But power and legacy come at a heavy cost...",
        "poster_path": "/vP7Yd6couiAaw9jgMd5cjMRj3hQ.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          18
        ],
        "popularity": 27.2908,
        "release_date": "2024-12-20",
        "video": false,
        "vote_average": 7.079,
        "vote_count": 890
      }
    ],
    "total_pages": 500,
    "total_results": 10000
  }






export const seedMedia = async () => {
  await Media.bulkCreate([
    // Add your media objects here, for example:
    // { title: "Movie 1", genre: "Action" },
  ]);
for (const movie of movies.results) {
    await Media.create({
        id: movie.id,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear(),
        genre: movie.genre_ids,
        rating: movie.vote_average,
        cover: movie.poster_path,
        embedKey: movie.id.toString(),
        });
}

}