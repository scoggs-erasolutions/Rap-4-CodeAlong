const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to fetch brawler data
app.get("/characters", async (req, res) => {
	const key = "4f79466478msh027dac3157f9db6p1ecba3jsn0532c6c38fc7";
	const host = "omgvamp-hearthstone-v1.p.rapidapi.com";
	const name = "TB_BaconShop_HERO_53";

	try {
		const response = await axios.get(
			`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${name}`,
			{
				headers: {
					"x-rapidapi-key": key,
					"x-rapidapi-host": host
				}
			}
		);
		res.json(response.data);
	} catch (error) {
		console.error("Error fetching data: ", error);
		res.status(500).send("Error fetching data from Hearth Stone API");
	}
});

// Route for the homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
