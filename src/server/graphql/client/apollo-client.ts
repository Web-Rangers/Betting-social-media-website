import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { env } from "src/env/server.mjs";
import { z } from "zod";

const queryClient = new ApolloClient({
	uri: env.GRAPHQL_URL,
	cache: new InMemoryCache(),
});
/*
    This is a example on how to write a query
    Might just write queries inside the TRPC router
    instead of exporting functions from here
*/
async function getUsers(limit?: number) {
	const data = await queryClient.query({
		query: gql`
			query GetUsers($limit: Int!) {
				users(first: $limit) {
					data {
						id
						name
						email
					}
				}
			}
		`,
		variables: {
			limit: limit,
		},
	});
	/*
        validate the returned object to
        get typesafety passed to the client
    */
	const usersSchema = z.object({
		data: z.object({
			users: z.object({
				data: z
					.object({
						id: z.number(),
						name: z.string(),
						email: z.string(),
					})
					.array(),
			}),
		}),
	});

	return usersSchema.parse(data).data.users;
}

export default queryClient;
