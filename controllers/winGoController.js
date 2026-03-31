import connection from "../config/connectDB";
// import jwt from 'jsonwebtoken'
// import md5 from "md5";
// import e from "express";
require('dotenv').config();


const winGoPage = async (req, res) => {
    return res.render("bet/wingo/win.ejs");
}

const winGoPage3 = async (req, res) => {
    return res.render("bet/wingo/win3.ejs");
}

const winGoPage5 = async (req, res) => {
    return res.render("bet/wingo/win5.ejs");
}

const winGoPage10 = async (req, res) => {
    return res.render("bet/wingo/win10.ejs");
}

const trxPage = async (req, res) => {
    return res.render("bet/trx/trx.ejs");
}

const trxPage3 = async (req, res) => {
    return res.render("bet/trx/trx3.ejs");
}

const trxPage5 = async (req, res) => {
    return res.render("bet/trx/trx5.ejs");
}

const trxPage10 = async (req, res) => {
    return res.render("bet/trx/trx10.ejs");
}


const isNumber = (params) => {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
}

function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
}


const commissions = async (auth, money) => {
    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `user_level`, `total_money` FROM users WHERE token = ?', [auth]);
    let userInfo = user

    // commission


    const [level] = await connection.query('SELECT * FROM level ');

    let checkTime2 = timerJoin2(Date.now());


    let uplines2 = userInfo;
    let count = 0
    for (let i = 0; i < 6; i++) {
        const rosesFs = (money / 100) * level[i].f1

        if (uplines2.length !== 0) {
            let [upline1] = await connection.query('SELECT * FROM users WHERE code = ?', [uplines2[0].invite]);

            if (upline1.length > 0) {
                count++

                const commissions = `INSERT INTO commission SET 
                  phone = ?,
                  bonusby=?,
                  type = ?,
                  commission=?,
                  amount = ?,
                  level = ?,
                  date = ?`;
                await connection.execute(commissions, [upline1[0].phone, uplines2[0].phone, "Bet", rosesFs, money, count, checkTime2]);
                await connection.query('INSERT INTO subordinatedata SET phone = ?, bonusby=?, type = ?, commission=?, amount = ?, level=?, `date` = ?', [upline1[0].phone, uplines2[0].phone, "bet commission", rosesFs, money, count, checkTime2]);

                await connection.query('UPDATE users SET pending_commission = pending_commission + ? WHERE phone = ? ', [rosesFs, upline1[0].phone]);
                uplines2 = upline1;
            } else {
                break; // Exit the loop if no further uplines are found
            }
        } else {
            break; // Exit the loop if uplines2 is empty
        }
    }

}


// calculateDownlineBonuses

const rosesPlus = async (auth, money) => {
    const [level] = await connection.query('SELECT * FROM level ');

    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `user_level`, `total_money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ', [auth]);
    let userInfo = user[0];
    const [f1] = await connection.query('SELECT `phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE code = ? AND veri = 1 LIMIT 1 ', [userInfo.invite]);

    let checkTime2 = timerJoin2(Date.now());



    if (userInfo.total_money >= 100) {
        if (f1.length > 0) {
            let infoF1 = f1[0];
            for (let levelIndex = 1; levelIndex <= 6; levelIndex++) {
                let rosesF = 0;
                if (infoF1.user_level >= levelIndex && infoF1.total_money >= 100) {
                    rosesF = (money / 100) * level[levelIndex - 1].f1;
                    if (rosesF > 0) {
                        await connection.query('UPDATE users SET roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ', [rosesF, rosesF, infoF1.phone]);
                        let timeNow = Date.now();
                        const datasql = 'INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` =?';
                        await connection.execute(datasql, [infoF1.phone, "Agent Commission", rosesF, checkTime2]);
                        const sql2 = `INSERT INTO roses SET 
                            phone = ?,
                            code = ?,
                            invite = ?,
                            f1 = ?,
                            time = ?`;
                        await connection.execute(sql2, [infoF1.phone, infoF1.code, infoF1.invite, rosesF, timeNow]);








                        const sql3 = `
                            INSERT INTO turn_over (phone, code, invite, daily_turn_over, total_turn_over)
                            VALUES (?, ?, ?, ?, ?)
                            ON DUPLICATE KEY UPDATE
                            daily_turn_over = daily_turn_over + VALUES(daily_turn_over),
                            total_turn_over = total_turn_over + VALUES(total_turn_over)
                            `;

                        await connection.execute(sql3, [infoF1.phone, infoF1.code, infoF1.invite, money, money]);
                    }
                }
                const [fNext] = await connection.query('SELECT `phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE code = ? AND veri = 1 LIMIT 1 ', [infoF1.invite]);
                if (fNext.length > 0) {
                    infoF1 = fNext[0];
                } else {
                    break;
                }
            }
        }
    }
}



const betWinGo = async (req, res) => {
    let { typeid, join, x, money } = req.body;
    let auth = req.cookies.auth;

    if (![1, 3, 5, 10, 11, 33, 55, 100].includes(typeid)) {
        return res.status(200).json({
            message: 'Invalid type id',
            status: false
        });
    }

    const gameMap = {
        1: 'wingo',
        3: 'wingo3',
        5: 'wingo5',
        10: 'wingo10',
        11: 'trx',
        33: 'trx3',
        55: 'trx5',
        100: 'trx10'
    };
    const gameJoin = gameMap[typeid];

    const [winGoNow] = await connection.query(`SELECT period FROM wingo WHERE status = 0 AND game = ? ORDER BY id DESC LIMIT 1`, [gameJoin]);
    const [user] = await connection.query('SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1', [auth]);

    if (!winGoNow[0] || !user[0] || !isNumber(x) || !isNumber(money)) {
        return res.status(200).json({
            message: 'Invalid data',
            status: false
        });
    }

    let userInfo = user[0];
    let period = winGoNow[0].period;
    let fee = (x * money) * 0.02;
    let total = (x * money) - fee;
    let timeNow = Date.now();
    let check = userInfo.money - total;

    if (check < 0) {
        return res.status(200).json({
            message: 'The amount is not enough',
            status: false
        });
    }

    let date = new Date();
    let id_product = formateT(date.getFullYear()) + formateT(date.getMonth() + 1) + formateT(date.getDate()) + Math.floor(Math.random() * 1000000000000000);
    let checkTime = timerJoin2(date.getTime());

    const sql = `INSERT INTO minutes_1 SET 
        id_product = ?,
        phone = ?,
        code = ?,
        invite = ?,
        stage = ?,
        level = ?,
        money = ?,
        amount = ?,
        fee = ?,
        get = ?,
        game = ?,
        bet = ?,
        status = ?,
        today = ?,
        time = ?,
        isdemo = ?`;

    await connection.execute(sql, [id_product, userInfo.phone, userInfo.code, userInfo.invite, period, userInfo.level, total, x, fee, 0, gameJoin, join, 0, checkTime, timeNow, userInfo.isdemo]);

    await connection.execute('UPDATE `users` SET `money` = `money` - ?, `rebate` = `rebate` + ? WHERE `token` = ?', [money * x, money * x, auth]);

    // Respond immediately after critical operations
    const [updatedUser] = await connection.query('SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1', [auth]);

    let total_money = money * x;

    let total_recharge = userInfo.recharge - total_money;

    if (total_recharge < 0) {
        total_recharge = 0
    }

    await connection.execute('UPDATE `users` SET `recharge` = ? WHERE `phone` = ?', [total_recharge, userInfo.phone]);



    const datasql = 'INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?';
    await connection.query(datasql, [userInfo.phone, "Bet", total, checkTime]);

    await rosesPlus(auth, money * x);
    await commissions(auth, money * x);

    res.status(200).json({
        message: 'Bet Succeed',
        status: true,
        change: updatedUser[0].level,
        money: updatedUser[0].money,
    });




};


function timerJoin2(params = '', addHours = 0) {
    let date = params ? new Date(Number(params)) : new Date();
    if (addHours !== 0) {
        date.setHours(date.getHours() + addHours);
    }

    const options = {
        timeZone: 'Asia/Kolkata', // Specify the desired time zone
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);

    const getPart = (type) => parts.find(part => part.type === type).value;

    const formattedDate = `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;

    return formattedDate;
}

// timerJoin2(Date.now())

const betWinGo2 = async (req, res) => {
    let typeid = 3;
    let join = "x";
    let x = 1;
    let money = 1

    let phone = "1234567891";

    if (![1, 3, 5, 10, 11, 33, 55, 100].includes(typeid)) {
        return res.status(200).json({
            message: 'Invalid type id',
            status: false
        });
    }

    const gameMap = {
        1: 'wingo',
        3: 'wingo3',
        5: 'wingo5',
        10: 'wingo10',
        11: 'trx',
        33: 'trx3',
        55: 'trx5',
        100: 'trx10'
    };
    const gameJoin = gameMap[typeid];

    const [winGoNow] = await connection.query(`SELECT period FROM wingo WHERE status = 0 AND game = ? ORDER BY id DESC LIMIT 1`, [gameJoin]);
    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `recharge`, `money` FROM users WHERE phone = ? AND veri = 1 LIMIT 1', [phone]);

    if (!winGoNow[0] || !user[0] || !isNumber(x) || !isNumber(money)) {
        return res.status(200).json({
            message: 'Invalid data',
            status: false
        });
    }

    let userInfo = user[0];
    let period = winGoNow[0].period;
    let fee = (x * money) * 0.02;
    let total = (x * money) - fee;
    let timeNow = Date.now();



    let date = new Date();
    let id_product = formateT(date.getFullYear()) + formateT(date.getMonth() + 1) + formateT(date.getDate()) + Math.floor(Math.random() * 1000000000000000);
    let checkTime = timerJoin2(date.getTime());

    const sql = `INSERT INTO minutes_1 SET 
        id_product = ?,
        phone = ?,
        code = ?,
        invite = ?,
        stage = ?,
        level = ?,
        money = ?,
        amount = ?,
        fee = ?,
        get = ?,
        game = ?,
        bet = ?,
        status = ?,
        today = ?,
        time = ?`;

    await connection.execute(sql, [id_product, userInfo.phone, userInfo.code, userInfo.invite, period, userInfo.level, total, x, fee, 0, gameJoin, join, 0, checkTime, timeNow]);


};






const listOrderOld = async (req, res) => {
    let { typeid, pageno, pageto } = req.body;

    // Validate typeid
    if (![1, 3, 5, 10, 11, 33, 55, 100].includes(typeid)) {
        return res.status(200).json({
            message: 'Invalid type id',
            status: false
        });
    }

    // Validate pageno and pageto
    if (pageno < 1 || pageto < 1) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            status: false
        });
    }

    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT phone, code, invite, level, money FROM users WHERE token = ? AND veri = 1 LIMIT 1', [auth]);

    if (!user[0]) {
        return res.status(200).json({
            message: 'Error! user is missing.',
            status: false
        });
    }

    let game = '';
    if (typeid == 1) game = 'wingo';
    if (typeid == 3) game = 'wingo3';
    if (typeid == 5) game = 'wingo5';
    if (typeid == 10) game = 'wingo10';
    if (typeid == 11) game = 'trx';
    if (typeid == 33) game = 'trx3';
    if (typeid == 55) game = 'trx5';
    if (typeid == 100) game = 'trx10';

    const offset = pageno - 1; // Adjust for 1-based index
    const limit = pageto - pageno + 1; // Number of rows to fetch

    const [wingo] = await connection.query(`
        SELECT * 
        FROM wingo 
        WHERE status != 0 AND game = '${game}' 
        ORDER BY id DESC 
        LIMIT ${limit} OFFSET ${offset}
    `);

    const [wingoAll] = await connection.query(`SELECT * FROM wingo WHERE status != 0 AND game = '${game}'`);
    const [period] = await connection.query(`SELECT period, time FROM wingo WHERE status = 0 AND game = '${game}' ORDER BY id DESC LIMIT 1`);




    //  await connection.query(`DELETE FROM wingo WHERE game = '${game}' AND time < NOW() - INTERVAL 30 DAY`);


    if (!wingo.length) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            status: false
        });
    }

    if (!period.length) {
        return res.status(200).json({
            message: 'Error! period is missing.',
            status: false
        });
    }

    let page = Math.ceil(wingoAll.length / limit);

    return res.status(200).json({
        code: 0,
        msg: "Get success",
        data: {
            gameslist: wingo,
        },
        period: period[0].period,
        page: page,
        time: period[0].time,
        status: true
    });
};



const GetMyEmerdList = async (req, res) => {
    let { typeid, pageno, pageto } = req.body;

    // if (!pageno || !pageto) {
    //     pageno = 0;
    //     pageto = 10;
    // }

    if (typeid != 1 && typeid != 3 && typeid != 5 && typeid != 10 && typeid != 11 && typeid != 33 && typeid != 55 && typeid != 100 && typeid != 15) {
        return res.status(200).json({
            message: 'Invalid type id',
            status: false
        });
    }

    if (pageno < 0 || pageto < 0) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            status: false
        });
    }
    let auth = req.cookies.auth;

    let game = '';
    if (typeid == 1) game = 'wingo';
    if (typeid == 3) game = 'wingo3';
    if (typeid == 5) game = 'wingo5';
    if (typeid == 10) game = 'wingo10';
    if (typeid == 11) game = 'trx';
    if (typeid == 33) game = 'trx3';
    if (typeid == 55) game = 'trx5';
    if (typeid == 100) game = 'trx10';
    if (typeid == 15) {
        const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1', [auth]);

        if (!user[0]) {
            return res.status(200).json({
                code: 0,
                msg: "User not found",
                data: {
                    gameslist: [],
                },
                status: false
            });
        }

        const phone = user[0].phone;

        const limit = 100; // Number of records per page
        const offset = (1 - 1) * limit;

        const [minutess_1] = await connection.query(
            `SELECT * FROM minutes_1 WHERE phone = ? ORDER BY id DESC LIMIT ? OFFSET ?`,
            [phone, limit, offset]
        );

        const [result_k3] = await connection.query(
            `SELECT *,
     CASE 
         WHEN game = 1 THEN 'K3 1'
         WHEN game = 3 THEN 'K3 3'
         WHEN game = 5 THEN 'K3 5'
         WHEN game = 10 THEN 'K3 10'
         ELSE game
     END AS game
     FROM result_k3 
     WHERE phone = ? 
     ORDER BY id DESC LIMIT ? OFFSET ?`,
            [phone, limit, offset]
        );

        const [result_5d] = await connection.query(
            `SELECT *,
     CASE 
         WHEN game = 1 THEN '5D 1'
         WHEN game = 3 THEN '5D 3'
         WHEN game = 5 THEN '5D 5'
         WHEN game = 10 THEN '5D 10'
         ELSE game
     END AS game
     FROM result_5d 
     WHERE phone = ? 
     ORDER BY id DESC LIMIT ? OFFSET ?`,
            [phone, limit, offset]
        );


        const combinedData = [...minutess_1, ...result_5d, ...result_k3];

        // await connection.query(  "DELETE FROM `result_5d` WHERE `phone` = ? AND `bet_data` < NOW() - INTERVAL 10 DAY",  [phone]);
        //   await connection.query(  "DELETE FROM `result_k3` WHERE `phone` = ? AND `bet_data` < NOW() - INTERVAL 10 DAY",  [phone]);
        //     await connection.query(  "DELETE FROM `minutes_1` WHERE `phone` = ? AND `today` < NOW() - INTERVAL 10 DAY",  [phone]);

        return res.status(200).json({
            code: 0,
            msg: "Get success",
            data: {
                gameslist: combinedData,
            },
            status: true
        });
    }



    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ', [auth]);

    const offset = pageno - 1; // Adjust for 1-based index
    const limit = pageto - pageno + 1; // Number of rows to fetch

    // const [wingo] = await connection.query(`
    //     SELECT * 
    //     FROM wingo 
    //     WHERE status != 0 AND game = '${game}' 
    //     ORDER BY id DESC 
    //     LIMIT ${limit} OFFSET ${offset}
    // `);

    const [minutes_1] = await connection.query(`SELECT * FROM minutes_1 WHERE phone = ? AND game = '${game}' ORDER BY id DESC  LIMIT ${limit} OFFSET ${offset}`, [user[0].phone]);
    const [minutes_1All] = await connection.query(`SELECT * FROM minutes_1 WHERE phone = ? AND game = '${game}' ORDER BY id DESC `, [user[0].phone]);

    if (minutes_1[0] === undefined || minutes_1[0] === null) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            status: false
        });
    }

    if (pageno === undefined || pageno === null || pageto === undefined || pageto === null || user[0] === undefined || user[0] === null || minutes_1[0] === undefined || minutes_1[0] === null) {
        return res.status(200).json({
            message: 'Error!',
            status: false
        });
    }
    let page = Math.ceil(minutes_1All.length / 10);

    let datas = minutes_1.map((data) => {
        let { id, phone, code, invite, level, game, ...others } = data;
        return others;
    });

    return res.status(200).json({
        code: 0,
        msg: "Get success data",
        data: {
            gameslist: minutes_1,
        },
        page: page,
        status: true
    });
}


function generateRandomHash(length) {
    const characters = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}





function timerJoins(params = '', addHours = 0) {
    let date = params ? new Date(Number(params)) : new Date();
    if (addHours !== 0) {
        date.setHours(date.getHours() + addHours);
    }

    const options = {
        timeZone: 'Asia/Kolkata', // Specify the desired time zone
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);

    const getPart = (type) => parts.find(part => part.type === type).value;

    const formattedDate = `${getPart('year')}${getPart('month')}${getPart('day')}`;

    return formattedDate;
}


//const addWinGo = async (game) => {
//    try {
//        // Map game values to their respective database keys
//        const gameMap = {
//            1: 'wingo',
//            3: 'wingo3',
//            5: 'wingo5',
//            10: 'wingo10',
//            11: 'trx',
//            33: 'trx3',
//            55: 'trx5',
//            100: 'trx10',
//        };
//
//        const join = gameMap[game];
//        if (!join) throw new Error("Invalid game type");
//
//        // Fetch the current period and block height
//        const [winGoNow] = await connection.query(`
//            SELECT period, blocs 
//            FROM wingo 
//            WHERE status = 0 AND game = ? 
//            ORDER BY id DESC 
//            LIMIT 1
//        `, [join]);
//
//        const currentDate = timerJoins(Date.now());
//        let period = winGoNow?.[0]?.period || `${currentDate}1000000`;
//        let blockHeight = winGoNow?.[0]?.blocs || 100000;
//
//        // Fetch bet categories
//        const betCategories = {
//            red: { small: ['0', '2', '4', 'd', 'n'], big: ['6', '8', 'd', 'l'] },
//            green: { small: ['1', '3', 'x', 'n'], big: ['5', '7', '9', 'x', 'l'] },
//            violet: { small: ['0', 't', 'n'], big: ['5', 't', 'l'] },
//        };
//
//        // Calculate total money for each category
//        const totalMoneyByCategory = {};
//        for (const [color, sizes] of Object.entries(betCategories)) {
//            for (const [size, bets] of Object.entries(sizes)) {
//                const [result] = await connection.query(`
//                    SELECT SUM(money) AS total_money 
//                    FROM minutes_1 
//                    WHERE game = ? AND status = 0 AND bet IN (${bets.map(b => `"${b}"`).join(',')})
//                `, [join]);
//                totalMoneyByCategory[`${color}_${size}`] = result[0]?.total_money || 0;
//            }
//        }
//
//        // Find the smallest category
//        const smallestCategory = Object.entries(totalMoneyByCategory).reduce((min, [key, value]) =>
//            value < min.value ? { key, value } : min,
//            { key: null, value: Infinity }
//        );
//
//        let amount;
//        if (smallestCategory.key) {
//            const [color, size] = smallestCategory.key.split('_');
//            
//            // Combine both small and big categories for selection
//           let availableBets = [
//                ...betCategories.red[size],
//                ...betCategories.green[size],
//                ...betCategories.violet[size]
//            ];
//
//            // Filter out non-numeric values
//            const validBets = availableBets.filter(bet => !isNaN(parseInt(bet, 10)));
//
//            // Shuffle the validBets array for better randomization
//            for (let i = validBets.length - 1; i > 0; i--) {
//                const j = Math.floor(Math.random() * (i + 1));
//                [validBets[i], validBets[j]] = [validBets[j], validBets[i]]; // Swap
//            }
//
//            // Pick a random number from the shuffled valid bets
//            const randomIndex = Math.floor(Math.random() * validBets.length);
//            amount = parseInt(validBets[randomIndex], 10); // Ensure it's a number
//
//            console.log("Done smallestCategory fine", smallestCategory, "game", join, "validBets", validBets, "selectedvalue", amount, "randomIndex", randomIndex);
//        } else {
//            // Default random amount if no category matches
//            amount = Math.floor(Math.random() * 10);
//            console.log("Random result", "game", join);
//        }
//
//        // Prepare the new period
//        const newPeriod = BigInt(period) + BigInt(1);
//
//        // Insert new period data
//        await connection.execute(`
//            INSERT INTO wingo (period, amount, game, status, hashvalue, blocs, time) 
//            VALUES (?, ?, ?, 0, ?, ?, ?)
//        `, [
//            String(newPeriod),
//            amount,
//            join,
//            generateRandomHash(10),
//            Number(blockHeight) + 20,
//            timerJoins(Date.now()),
//        ]);
//
//        // Handle next results and update the admin table
//        const [setting] = await connection.query(`SELECT * FROM admin`);
//        let nextResult = setting[0][join];
//        let newArr = '';
//
//        if (nextResult === '-1') {
//            await connection.execute(`
//                UPDATE wingo 
//                SET amount = ?, status = ? 
//                WHERE period = ? AND game = ?
//            `, [amount, 1, period, join]);
//            newArr = '-1';
//        } else {
//            let arr = nextResult.split('|');
//            const result = arr[0];
//            newArr = arr.length > 1 ? arr.slice(1).join('|') : '-1';
//
//            await connection.execute(`
//                UPDATE wingo 
//                SET amount = ?, status = ? 
//                WHERE period = ? AND game = ?
//            `, [result, 1, period, join]);
//        }
//
//        // Update admin settings
//        await connection.execute(`
//            UPDATE admin 
//            SET ${join} = ?
//        `, [newArr]);
//
//    } catch (error) {
//        console.error("Error in addWinGo:", error);
//    }
//};
//


// Function to shuffle the array in place
function shuffleArrayInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}




const addWinGo = async (game) => {
    try {
        let join = '';
        let updatenum = 1;


        if (game == 1) join = 'wingo';
        if (game == 3) join = 'wingo3';
        if (game == 5) join = 'wingo5';
        if (game == 10) join = 'wingo10';
        if (game == 11) join = 'trx';
        if (game == 33) join = 'trx3';
        if (game == 55) join = 'trx5';
        if (game == 100) join = 'trx10';
        // Mapping game number to corresponding join string and update number

        if (game == 1) updatenum = 1;
        if (game == 3) updatenum = 2;
        if (game == 5) updatenum = 3;
        if (game == 10) updatenum = 4;
        if (game == 11) updatenum = 3;
        if (game == 33) updatenum = 4;
        if (game == 55) updatenum = 5;
        if (game == 100) updatenum = 6;




        const [winGoNow] = await connection.query(`SELECT period FROM wingo WHERE status = 0 AND game = ? ORDER BY id DESC LIMIT 1`, [join]);

        let period = winGoNow[0]?.period;
        if (winGoNow?.length === 0) {
            console.log("No data found for the given game and status.");
            period = "9787955"
        }

        const currentDates = new Date();
        const formattedDates = `${currentDates.getFullYear()}${String(currentDates.getMonth() + 1).padStart(2, '0')}${String(currentDates.getDate()).padStart(2, '0')}`;
        let blockhight = "0";

        const [setting] = await connection.query('SELECT * FROM `admin`');
        let amount = Math.floor(Math.random() * 10);

        const [minPlayers] = await connection.query(`SELECT * FROM minutes_1 WHERE status = 0 AND isdemo = 0 AND game = ?`, [join]);

        if (minPlayers.length >= 1) {
            const betColumns = [
                { name: 'red_small', bets: ['0', '2', '4', 'd', 'n'] },
                { name: 'red_big', bets: ['6', '8', 'd', 'l'] },
                { name: 'green_big', bets: ['5', '7', '9', 'x', 'l'] },
                { name: 'green_small', bets: ['1', '3', 'x', 'n'] },
                { name: 'violet_small', bets: ['0', 't', 'n'] },
                { name: 'violet_big', bets: ['5', 't', 'l'] }
            ];

            // Shuffle the original betColumns array
            shuffleArrayInPlace(betColumns);

            const categories = await Promise.all(betColumns.map(async column => {
                const [result] = await connection.query(`
                    SELECT SUM(money) AS total_money
                    FROM minutes_1
                    WHERE game = ? AND status = 0 AND isdemo = 0 AND bet IN (${column.bets.map(bet => `"${bet}"`).join(',')})
                `, [join]);
                return { name: column.name, total_money: parseInt(result[0]?.total_money) || 0 };
            }));


            shuffleArrayInPlace(categories);


            const smallestCategory = categories.reduce((smallest, category) =>
                (!smallest || category.total_money < smallest.total_money) ? category : smallest
            );



            const [color, size] = smallestCategory.name.split('_');
            let availableBets = betColumns.find(col => col.name === `${color}_${size}`)?.bets || [];
            const validBets = availableBets.filter(bet => !isNaN(parseInt(bet, 10)));

            for (let i = validBets.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [validBets[i], validBets[j]] = [validBets[j], validBets[i]]; // Swap
            }

            const randomIndex = Math.floor(Math.random() * validBets.length);
            amount = parseInt(validBets[randomIndex], 10);


        } else if (minPlayers.length === 1 && parseFloat(minPlayers[0].money) >= 20) {
            const betColumns = [
                { name: 'red_small', bets: ['0', '2', '4', 'd', 'n'] },
                { name: 'red_big', bets: ['6', '8', 'd', 'l'] },
                { name: 'green_big', bets: ['5', '7', '9', 'x', 'l'] },
                { name: 'green_small', bets: ['1', '3', 'x', 'n'] },
                { name: 'violet_small', bets: ['0', 't', 'n'] },
                { name: 'violet_big', bets: ['5', 't', 'l'] }
            ];

            const categories = await Promise.all(betColumns.map(async column => {
                const [result] = await connection.query(`
                    SELECT SUM(money) AS total_money
                    FROM minutes_1
                    WHERE game = ? AND status = 0 AND isdemo = 0 AND bet IN (${column.bets.map(bet => `"${bet}"`).join(',')})
                `, [join]);
                return { name: column.name, total_money: parseInt(result[0]?.total_money) || 0 };
            }));

            const smallestCategory = categories.reduce((smallest, category) =>
                (!smallest || category.total_money < smallest.total_money) ? category : smallest
            );

            const betsForCategory = colorBets[smallestCategory.name] || [];
            const availableBets = betsForCategory.filter(bet =>
                !categories.find(category => category.name === smallestCategory.name && category.total_money < smallestCategory.total_money)
            );

            const lowestBet = availableBets.length > 0 ? availableBets[0] : Math.min(...betsForCategory);
            amount = lowestBet;
        }


        let nextResult = '-1';
        if (game == 1) nextResult = setting[0].wingo;
        if (game == 3) nextResult = setting[0].wingo3;
        if (game == 5) nextResult = setting[0].wingo5;
        if (game == 10) nextResult = setting[0].wingo10;
        if (game == "11") nextResult = setting[0].trx;
        if (game == "33") nextResult = setting[0].trx3;
        if (game == "55") nextResult = setting[0].trx5;
        if (game == "100") nextResult = setting[0].trx10;


        let newArr = '';
        if (nextResult == '-1') {
            await connection.execute(`UPDATE wingo SET amount = ?,status = ? WHERE period = ? AND game = "${join}"`, [amount, 1, period]);
            newArr = '-1';
            // connection.release();
        } else {
            let result = '';
            let arr = nextResult.split('|');
            let check = arr.length;
            if (check == 1) {
                newArr = '-1';
            } else {
                for (let i = 1; i < arr.length; i++) {
                    newArr += arr[i] + '|';
                }
                newArr = newArr.slice(0, -1);
            }
            result = arr[0];
            await connection.execute(`UPDATE wingo SET amount = ?,status = ? WHERE period = ? AND game = "${join}"`, [Number(result), 1, period]);
        }

        let checkTime2 = timerJoin2(Date.now());

        let times = timerJoins(Date.now());

        if (winGoNow[0] === undefined) {
            // If no previous period exists, start with formattedDate + 0100
            period = `${times}1${updatenum}0000`;
            blockhight = "100000"
        } else {
            // Get the period from the database
            let dbPeriod = winGoNow[0].period;

            // Extract the date part from the database period
            let dbDatePart = dbPeriod.slice(0, 8);

            if (dbDatePart == times) {
                // If the date part matches the current date, use the database period
                period = dbPeriod;

                if (dbDatePart !== times) {
                    await connection.execute(`DELETE FROM wingo WHERE status = 0 AND game = "${join}"`);
                }

            } else {
                // If the date part does not match, start with formattedDate + 0100
                period = `${times}1${updatenum}0000`;



            }
            if (winGoNow[0].blocs == 0 || winGoNow[0].blocs == undefined) {
                blockhight = "100000"
            } else {
                blockhight = winGoNow[0]?.blocs;

            }

        }



        const newPeriod = BigInt(period) + BigInt(1);


        const sql = `INSERT INTO wingo SET 
        period = ?,
        amount = ?,
        game = ?,
        status = ?,
        hashvalue=?,
        blocs=?,
        time = ?`;
        await connection.execute(sql, [String(newPeriod), 0, join, 0, generateRandomHash(10), Number(blockhight) + 20, checkTime2,]);

        if (game == 1) join = 'wingo';
        if (game == 3) join = 'wingo3';
        if (game == 5) join = 'wingo5';
        if (game == 10) join = 'wingo10';
        if (game == 11) join = 'trx';
        if (game == 33) join = 'trx3';
        if (game == 55) join = 'trx5';
        if (game == 100) join = 'trx10';

        await connection.execute(`UPDATE admin SET ${join} = ?`, [newArr]);
    } catch (error) {
        console.log(error);
    }
};


const handlingWinGo1P = async (typeid) => {

    let game = '';
    if (typeid == 1) game = 'wingo';
    if (typeid == 3) game = 'wingo3';
    if (typeid == 5) game = 'wingo5';
    if (typeid == 10) game = 'wingo10';
    if (typeid == "11") game = 'trx';
    if (typeid == "33") game = 'trx3';
    if (typeid == "55") game = 'trx5';
    if (typeid == "100") game = 'trx10';
    const [winGoNow] = await connection.query(`SELECT * FROM wingo WHERE status != 0 AND game = '${game}' ORDER BY id DESC LIMIT 1 `);

    if (!winGoNow || winGoNow.length === 0) {
        console.log("❌ No data found in wingo table for game:", game);
        return; // 🔥 yahi crash rokega
    }

    // update ket qua
    await connection.execute(`UPDATE minutes_1 SET result = ? WHERE status = 0 AND game = '${game}'`, [winGoNow[0].amount]);
    let result = Number(winGoNow[0]?.amount);
    switch (result) {
        case 0:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "0" AND bet != "t" `, []);
            break;
        case 1:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "1" `, []);
            break;
        case 2:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "2" `, []);
            break;
        case 3:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "3" `, []);
            break;
        case 4:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "4" `, []);
            break;
        case 5:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "5" AND bet != "t" `, []);
            break;
        case 6:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "6" `, []);
            break;
        case 7:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "7" `, []);
            break;
        case 8:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "8" `, []);
            break;
        case 9:
            await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "9" `, []);
            break;
        default:
            break;
    }

    if (result < 5) {
        await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet = "l" `, []);
    } else {
        await connection.execute(`UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet = "n" `, []);
    }

    // lấy ra danh sách đặt cược chưa xử lý
    const [orders] = await connection.execute(`SELECT * FROM minutes_1 WHERE status = 0 AND game = '${game}'`);

    const processBet = async (orders) => {

        let result = orders.result;
        let bet = orders.bet;
        let total = orders.money;
        let id = orders.id;
        let phone = orders.phone;
        let nhan_duoc = 0;

        if (bet == 'l' || bet == 'n') {
            nhan_duoc = total * 2;
        } else {
            if (result == 0 || result == 5) {
                if (bet == 'd' || bet == 'x') {
                    nhan_duoc = total * 1.5;
                } else if (bet == 't') {
                    nhan_duoc = total * 4.5;
                } else if (bet == "0" || bet == "5") {
                    nhan_duoc = total * 4.5;
                }
            } else {
                if (result == 1 && bet == "1") {
                    nhan_duoc = total * 9;
                } else if (result == 1 && bet == 'x') {
                    nhan_duoc = total * 2;
                }
                if (result == 2 && bet == "2") {
                    nhan_duoc = total * 9;
                } else if (result == 2 && bet == 'd') {
                    nhan_duoc = total * 2;
                }
                if (result == 3 && bet == "3") {
                    nhan_duoc = total * 9;
                } else if (result == 3 && bet == 'x') {
                    nhan_duoc = total * 2;
                }
                if (result == 4 && bet == "4") {
                    nhan_duoc = total * 9;
                } else if (result == 4 && bet == 'd') {
                    nhan_duoc = total * 2;
                }
                if (result == 6 && bet == "6") {
                    nhan_duoc = total * 9;
                } else if (result == 6 && bet == 'd') {
                    nhan_duoc = total * 2;
                }
                if (result == 7 && bet == "7") {
                    nhan_duoc = total * 9;
                } else if (result == 7 && bet == 'x') {
                    nhan_duoc = total * 2;
                }
                if (result == 8 && bet == "8") {
                    nhan_duoc = total * 9;
                } else if (result == 8 && bet == 'd') {
                    nhan_duoc = total * 2;
                }
                if (result == 9 && bet == "9") {
                    nhan_duoc = total * 9;
                } else if (result == 9 && bet == 'x') {
                    nhan_duoc = total * 2;
                }
            }
        }

        let checkTime2 = timerJoin2(Date.now());

        let totalsGet = parseFloat(nhan_duoc);

        await connection.execute('UPDATE `minutes_1` SET `get` = ?, `status` = 1 WHERE `id` = ? ', [totalsGet, id]);
        await connection.execute('INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?', [phone, "Win", totalsGet, checkTime2]);
        await connection.execute('UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ?', [totalsGet, phone]);
    };

    const promises = orders.map(order => processBet(order));

    await Promise.all(promises);


}

const tradeCommission = async () => {

    try {


        // Fetch users with pending commission
        const [users] = await connection.execute(
            'SELECT * FROM `users` WHERE `pending_commission` > 0'
        );

        if (users.length === 0) {
            console.log('No users with pending commission.');
            return;
        }

        const sumdate = timerJoin2(Date.now());

        // Prepare bulk update and insert statements
        const updateQueries = [];
        const insertQueries = [];

        for (let user of users) {
            updateQueries.push(
                connection.execute(
                    'UPDATE `users` SET `money` = `money` + ?, `pending_commission` = 0 WHERE `phone` = ?',
                    [user.pending_commission, user.phone]
                )
            );

            insertQueries.push(
                connection.execute(
                    'INSERT INTO transaction_history (phone, detail, balance, `time`) VALUES (?, ?, ?, ?)',
                    [user.phone, 'Team trade commission', user.pending_commission, sumdate]
                )
            );
        }

        // Execute all updates and inserts in parallel
        await Promise.all(updateQueries);
        await Promise.all(insertQueries);



    } catch (error) {

        console.error('Error processing commissions:', error);
    } finally {

    }
};


const tradeCommissionadmin = async (req, res) => {

    try {


        // Fetch users with pending commission
        const [users] = await connection.execute(
            'SELECT * FROM `users` WHERE `pending_commission` > 0'
        );

        if (users.length === 0) {
            console.log('No users with pending commission.');
            return res.status(200).json({
                message: 'No users with pending commission!',
                status: true,
            });

        }

        const sumdate = timerJoin2(Date.now());

        // Prepare bulk update and insert statements
        const updateQueries = [];
        const insertQueries = [];

        for (let user of users) {
            updateQueries.push(
                connection.execute(
                    'UPDATE `users` SET `money` = `money` + ?, `pending_commission` = 0 WHERE `phone` = ?',
                    [user.pending_commission, user.phone]
                )
            );

            insertQueries.push(
                connection.execute(
                    'INSERT INTO transaction_history (phone, detail, balance, `time`) VALUES (?, ?, ?, ?)',
                    [user.phone, 'Team trade commission', user.pending_commission, sumdate]
                )
            );
        }

        // Execute all updates and inserts in parallel
        await Promise.all(updateQueries);
        await Promise.all(insertQueries);


        return res.status(200).json({
            message: 'commission Successfully!',
            status: true,
        });


    } catch (error) {
        return res.status(500).json({
            message: 'internal server error!',
            status: false,
        });


    } finally {

    }
};



const tradeCommissionGet = async (req, res) => {

    try {


        // Fetch users with pending commission
        const [users] = await connection.query(
            'SELECT * FROM `users` WHERE `pending_commission` > 0'
        );

        return res.status(200).json({
            message: 'commission Successfully!',
            status: true,
            data: users
        });





    }
    catch (error) {
        return res.status(500).json({
            message: 'internal server error!',
            status: false,
        });

    }
};







// const demoni = async () => {

//   try {
//     // Fetch users with pending commission
//     const [users] = await connection.execute(
//       "SELECT * FROM `minutes_1` WHERE `stage` ='20240918130834' AND `bet` = 'x' AND `status`=1"
//     );

//     // Loop through the users and update their money and pending_commission
//     for (let user of users) {

//       // Update the user's money and reset pending_commission to 0
//     //   await connection.execute(
//     //     'UPDATE users SET money = money+? WHERE phone = ?',
//     //     [user.get, user.phone]
//     //   );


//     }

//   } catch (error) {

//     console.error('Error processing commissions:', error);
//   } finally {

//   }
// };
















module.exports = {
    winGoPage,
    betWinGo,
    listOrderOld,
    GetMyEmerdList,
    handlingWinGo1P,
    addWinGo,
    winGoPage3,
    winGoPage5,
    winGoPage10,
    trxPage,
    trxPage3,
    trxPage5,
    trxPage10,
    tradeCommission,
    tradeCommissionadmin,
    tradeCommissionGet
}