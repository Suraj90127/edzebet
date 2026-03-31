import connection from "../config/connectDB";
import axios from "axios"



const openGame = async (req, res) => {
    try {
        // Extract auth token and gameId from the request
        const auth = req.cookies.auth;
        const gameId = req.body.gameId;

        // Validate if token and gameId are provided
        if (!auth) {
            return res.status(400).json({
                message: 'Undefined token',
                status: false,
            });
        }

        if (!gameId) {
            return res.status(400).json({
                message: 'Undefined gameId',
                status: false,
            });
        }

        // Fetch user details using the token
        const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ?', [auth]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                message: 'Invalid user',
                status: false,
            });
        }

        const user = rows[0]; // Extract the user data

        // Ensure the necessary fields exist in the user data
        if (!user.phone || !user.money) {
            return res.status(400).json({
                message: 'Invalid user data',
                status: false,
            });
        }

        // Call the `/games/open` API
        const openGameResponse = await axios.post('https://allapi.codehello.site/api/games/open', {
            playerId: user.phone, // Using the player's phone number as the playerId
            gameId: gameId,
            money: user.money > 0 ? user.money : 0 
        });

        // Check if the game opened successfully
        if (openGameResponse.data && openGameResponse.data.message === "Game opened successfully") {
            // Call the `/balance/add` API to update the balance
            // const balanceResponse = await axios.post('https://allapi.codehello.site/api/balance/add', {
            //     playerId: user.phone,
            //     amount: user.money,
            // });

            // Deduct money from the user's account in the database
            await connection.query('UPDATE users SET money = money - ? WHERE phone = ?', [user.money, user.phone]);

            return res.status(200).json({
                message: 'Game session opened successfully.',
                status: true,
                data: openGameResponse.data.data
                // data: {
                //     gameData: openGameResponse.data.data, // Assuming this contains additional details like a game URL
                //     balanceUpdate: balanceResponse.data, // Include balance API response
                // },
            });
        }

        // Handle unexpected API responses
        return res.status(500).json({
            message: 'Failed to open game session.',
            status: false,
            error: openGameResponse.data,
        });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            error: error.message,
        });
    }
};

const moneyTransfer = async (req, res) => {
    try {
        // Extract auth token and gameId from the request
        const auth = req.cookies.auth;

        // Validate if token and gameId are provided
        if (!auth) {
            return res.status(400).json({
                message: 'Undefined token',
                status: false,
            });
        }
        // Fetch user details using the token
        const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ?', [auth]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                message: 'Invalid user',
                status: false,
            });
        }

        const user = rows[0]; // Extract the user data

        const balanceResponses = await axios.get(`https://allapi.codehello.site/api/checkBalance?playerId=${user.phone}`);

        // Call the `/balance/add` API to update the balance
        const balanceResponse = await axios.post('https://allapi.codehello.site/api/balance/deduct', {
            playerId: user.phone,
            amount: balanceResponses.data.data.amount,
        });

        // Deduct money from the user's account in the database
        await connection.query('UPDATE users SET money = money + ? WHERE phone = ?', [Number(balanceResponses.data.data.amount), user.phone]);

        return res.status(200).json({
            message: 'money transfer successfully.',
            status: true,
            data: balanceResponse.data
            // data: {
            //     gameData: openGameResponse.data.data, // Assuming this contains additional details like a game URL
            //     balanceUpdate: balanceResponse.data, // Include balance API response
            // },
        });




    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            message: 'Internal server errors',
            status: false,
            error: error.message,
        });
    }
};



module.exports = {
    openGame,
    moneyTransfer,
}