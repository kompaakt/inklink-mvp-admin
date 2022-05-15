const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
	origin: (origin, callback) => {
		const allowed = [
			"http://localhost:3000",
			"http://65.108.254.138:8080/",
		];
		if (allowed.indexOf(origin) !== -1) {
			return callback(null, true);
		}
		return callback(
			new Error(`CORS Policy denies ${origin}`),
			false
		);
	},
});
const { v4: uuidv4 } = require("uuid")
const { hasuraClient } = require("./hasura_client");

const Firestore = require("@google-cloud/firestore");
admin.initializeApp(functions.config().firebase);

const firestore = new Firestore({
	projectId: "inklink-de66a",
	timestampsInSnapshots: true,
});

const defaultAdminClientRole = "artist";

const updateClaims = (uid) =>
	firestore
		.collection("claims")
		.doc(uid)
		.get()
		.then((doc) => {
			if (!doc) {
				return {};
			}
			const data = doc.data();
			return data;
		})
		.then((additionalClaims) => {
			const defaultClaims = {
				"x-hasura-default-role": defaultAdminClientRole,
				"x-hasura-allowed-roles": [
					defaultAdminClientRole,
				],
				"x-hasura-user-id": uid,
			};
			const claims = {
				"https://hasura.io/jwt/claims": {
					...defaultClaims,
					...additionalClaims,
				},
			};
			return admin.auth().setCustomUserClaims(uid, claims);
		});

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
	updateClaims(user.uid);
	const hasuraUserCreateResult = await hasuraClient.request(
		`mutation createUser($id: uuid!, $firebaseId: String!) {
			insert_users_one(object: {id: $id, firebaseUid: $firebaseId, role: "ARTIST"}) {
				id
			}
		}
		`,
		{
			firebaseId: user.uid,
			id: uuidv4(),
		}
	)

	if (!hasuraUserCreateResult?.insert_users_one?.id) {
		throw new Error('error creating hasura user')
	}

	return { ...hasuraUserCreateResult?.insert_users_one }
});

exports.refreshToken = functions.https.onRequest((req, res) => {
	functions.logger.log("TOKEN REFRESH", req.query.uid);

	cors(req, res, () => {
		updateClaims(req.query.uid)
			.then(() => {
				res.status(200).send("success");
			})
			.catch((error) => {
				console.error("REFRESH ERROR", error);
				res.status(400).send(error);
			});
	});
});

