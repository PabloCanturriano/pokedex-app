const GRAPHQL_URL = process.env.EXPO_PUBLIC_GRAPHQL_URL;

if (!GRAPHQL_URL) {
   throw new Error('EXPO_PUBLIC_GRAPHQL_URL is not defined. Check your .env file.');
}

export async function gqlQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
   const response = await fetch(GRAPHQL_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
   });

   if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
   }

   const json = await response.json();
   if (json.errors?.length) {
      throw new Error(json.errors[0].message);
   }

   return json.data as T;
}
