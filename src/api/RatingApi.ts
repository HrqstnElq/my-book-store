import {Axios} from "./Axios";

type Vote = {
	bookId: number;
	rating: number;
	comment?: string;
};

export const PostVote = (token: string, vote: Vote) =>
	Axios.post("/api/rating/vote", vote, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
