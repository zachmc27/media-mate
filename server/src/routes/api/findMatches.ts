import { Op } from 'sequelize';
import { Matches } from '../../models/matches.js';
import { User } from '../../models/user.js'; // Ensure the file exists and is named 'users.ts' or 'users.js'


export async function findMatches(array: any[], array2: any[]): Promise<any[]> {
    const matches = array.filter((item, index) => item === array2[index]);
    return matches;
}

//input: [ 'a', 'b', 'c' ,'f','6'], [ 'a', '6', 'c' ]
//output: [ 'a', 'c' ]


export async function getCollabLists(userId: number) {
    // Fetch all matches where the userId is either userOneId or userTwoId
    const matchesList = await Matches.findAll({
        attributes: ['userOneId', 'userTwoId', 'matches', 'flickPickListId'],
        where: {
            [Op.or]: [
                { userOneId: userId },
                { userTwoId: userId }
            ]
        }
    });

    // Consolidate matches into a single object with unique userOneId-userTwoId combinations
    const collabList: Record<string, { userOneId: number; userTwoId: number; matches: any[]; flickPickListId: any[]; name?: string }> = {};

    for (const match of matchesList) {
        const key = `${Math.min(match.userOneId, match.userTwoId)}-${Math.max(match.userOneId, match.userTwoId)}`;
        if (!collabList[key]) {
            const userOneName = (await User.findOne({ where: { id: Math.min(match.userOneId, match.userTwoId) } }))?.name || 'Unknown';
            const userTwoName = (await User.findOne({ where: { id: Math.max(match.userOneId, match.userTwoId) } }))?.name || 'Unknown';
            collabList[key] = {
                name: `${userOneName} & ${userTwoName}`,
                userOneId: Math.min(match.userOneId, match.userTwoId),
                userTwoId: Math.max(match.userOneId, match.userTwoId),
                flickPickListId: [],
                matches: []
                
            };
        }
        collabList[key].matches = collabList[key].matches.concat(match.matches);
        collabList[key].flickPickListId = collabList[key].flickPickListId.concat(match.flickPickListId);
    }

    // Flatten the matches and flickPickListId arrays for each unique combination
    Object.values(collabList).forEach((entry: any) => {
        entry.matches = Array.from(new Set(entry.matches.flat()));
        entry.flickPickListId = Array.from(new Set(entry.flickPickListId.flat()));
    });

    console.log(collabList);
    return Object.values(collabList);
}
//example input
// const matchesList = [
//     { userOneId: 1, userTwoId: 2, matches: [1, 2, 3] },
//     { userOneId: 2, userTwoId: 1, matches: [4, 5] },
//     { userOneId: 1, userTwoId: 3, matches: [6] },
//     { userOneId: 3, userTwoId: 1, matches: [7] },
//     { userOneId: 2, userTwoId: 3, matches: [8] },
//     { userOneId: 3, userTwoId: 2, matches: [9] },
// ];
// const userId = 1;
// const collabList = getCollabLists(userId);
// console.log(collabList);
// // Output:
// // [
// //     { userOneId: 1, userTwoId: 2, matches: [1, 2, 3, 4, 5], flickPickListId: [1, 2] },
// //     { userOneId: 1, userTwoId: 3, matches: [6, 7], flickPickListId: [3] },
// // ]
